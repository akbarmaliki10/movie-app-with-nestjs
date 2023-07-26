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


@Injectable()
export class MovieService {
  private readonly logger = new Logger(MovieService.name);
  constructor(
    @InjectRepository(Movies)
    private movieRepository: Repository<Movies>,
    private readonly eventEmitter: EventEmitter2,
    private schedulerRegistry: SchedulerRegistry
  ) { }

  async createMovieService(createMovieDto: CreateMovieDto) {
    this.eventEmitter.emit(
      'user.created',
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
        headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTRjZWJmZGQ3ODZkYmRkNGZmNGExZGY1NTZlZWJiZSIsInN1YiI6IjY0YmUyNDUxZTlkYTY5MDEyZTBlYzhlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1_UgsYGdBsKHUX5v2CDHbbaxjUsZ3KM3xR7xozfr48', Accept: 'application/json' }
      }).then(async (data) => {
        console.log(data[1])
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
          console.log(resData[i])
        }
        return {"status":"Seeding success"}
      })
    } catch (e) {
      return " There are duplicate seed data"
    }
  }

  async getAllMovie() {
    return this.movieRepository.find();
  }

  async deleteAllMovie() {
    return this.movieRepository.delete({})
  }

  @OnEvent('user.created')
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

  @OnEvent('user.created', { async: true })
  async sendWelcomeGift(payload: UserCreatedEvent) {
    this.logger.log("Please remind that the movie is playing until: " + payload.createMovieDto.play_until);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
  }

}
