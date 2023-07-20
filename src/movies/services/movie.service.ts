import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from "moment";
import { CreateMovieDto } from 'src/movies/dto/CreateMovie.dto';
import { Movies } from 'src/movies/typeorm/Movies';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
  private readonly logger = new Logger(MovieService.name);
  constructor(
    @InjectRepository(Movies)
    private movieRepository: Repository<Movies>
  ) { }

  async createMovieService(createMovieDto: CreateMovieDto) {
    this.logger.log("Creating movie --- " + createMovieDto.title)
    const newMovie = this.movieRepository.create(createMovieDto);
    newMovie.created_at = await new Date(moment().format("MMM DD, YYYY HH:MM"));

    return this.movieRepository.save(newMovie).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });

  }

  async getAllMovie() {
    return this.movieRepository.find();
  }
}
