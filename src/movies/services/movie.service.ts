import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from "moment";
import { CreateMovieDto } from 'src/movies/dto/CreateMovie.dto';
import { Movies } from 'src/movies/typeorm/Movies';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {

  constructor(
    @InjectRepository(Movies)
    private movieRepository: Repository<Movies>
  ) { }

  async createMovieService(createMovieDto: CreateMovieDto) {
    const newMovie = this.movieRepository.create(createMovieDto);
    newMovie.created_at = await new Date(moment().format("MMM DD, YYYY HH:MM"));

    return this.movieRepository.save(newMovie).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });

  }
}
