import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from "moment";
import { CreateMovieDto } from 'src/movies/dto/CreateMovie.dto';
import { Movies } from 'src/movies/typeorm/Movies';
import { Repository } from 'typeorm';
import { UserCreatedEvent } from '../events/user-created.event';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import axios from 'axios'
import { response } from 'express';
import { CreateScheduleDto } from '../dto/CreateScheduleDto';
import { MovieSchedules } from '../typeorm/MovieSchedules';


@Injectable()
export class MovieService {
  private readonly logger = new Logger(MovieService.name);
  constructor(
    @InjectRepository(Movies)
    private movieRepository: Repository<Movies>,
    @InjectRepository(MovieSchedules)
    private movieScheduleRepository: Repository<MovieSchedules>,
    private readonly eventEmitter: EventEmitter2,
    private schedulerRegistry: SchedulerRegistry
  ) { }

  async createMovieService(createMovieDto: CreateMovieDto) {
    this.eventEmitter.emit(
      'movie.created',
      new UserCreatedEvent(createMovieDto)
    );
    const establishTimeout = setTimeout(
      () => this.removeTestMovie(createMovieDto.title),
      10000);

    this.schedulerRegistry.addTimeout(
      "remove_test_movie_" + createMovieDto.title,
      establishTimeout
    )
    return createMovieDto;
  }

  // please delete this on production because its just for testing
  private removeTestMovie(movieTitle: string) {
    this.movieRepository.delete({ title: movieTitle })
  }

  async seedDB() {
    try {
      const result = axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
        headers: { 'Authorization': `Bearer ${process.env.TMDB_READ_KEY}`, Accept: 'application/json' }
      }).then(async (data) => {
        const resData = data.data.results
        for (var i = 0; i < resData.length; i++) {
          const newDto = new CreateMovieDto();
          newDto.title = resData[i].title
          newDto.overview = resData[i].overview
          newDto.play_until = resData[i].play_until
          const newMovie = this.movieRepository.create(newDto)
          newMovie.upload_time = new Date(moment().format("MMM DD, YYYY HH:MM"));
          this.movieRepository.save(newMovie).catch(err => {
            throw new HttpException({
              message: err.message
            }, HttpStatus.BAD_REQUEST)
          });
        }
        return {"status":"Seeding success"}
      })
    } catch (e) {
      return " There are duplicate seed data"
    }
  }

  async getAllMovie() {
    return this.movieRepository.find({
      relations: {
          movie_schedules: true      }
  });
  }

  async deleteAllMovie() {
    return this.movieRepository.delete({})
  }

  @OnEvent('movie.created')
  welcomeNewUser(payload: UserCreatedEvent) {
    this.logger.log("Creating movie --- " + payload.createMovieDto.title)
    const newMovie = this.movieRepository.create(payload.createMovieDto);
    newMovie.upload_time = new Date(moment().format("MMM DD, YYYY HH:MM"));

    return this.movieRepository.save(newMovie).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

  @OnEvent('movie.created', { async: true })
  async sendWelcomeGift(payload: UserCreatedEvent) {
    this.logger.log("Please remind that the movie is playing until: " + payload.createMovieDto.play_until);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
  }

  async createMovieScheduleService(createScheduleDto: CreateScheduleDto) {
    const movie = await this.movieRepository.findOneBy({title:createScheduleDto.movieName})
    
    const newSchedule = new MovieSchedules()
    newSchedule.movie_id = movie
    newSchedule.start_time = createScheduleDto.start_time
    newSchedule.end_time = createScheduleDto.end_time
    newSchedule.date = createScheduleDto.date
    newSchedule.price = createScheduleDto.price
    
    const newMovieSchedule = this.movieScheduleRepository.create(newSchedule)

    if (movie.movie_schedules == null) {
      movie.movie_schedules= [newMovieSchedule]
    } else {
      movie.movie_schedules.push(newMovieSchedule)
    }
    this.movieRepository.save(movie)
    return this.movieScheduleRepository.save(newMovieSchedule).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

  async getAllMovieSchedule() {
    return await this.movieScheduleRepository.find({
      relations: {
        movie_id: true
      }
  });
  }
}
