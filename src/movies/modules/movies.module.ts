import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from 'src/movies/controllers/movie.controller';
import { MovieService } from 'src/movies/services/movie.service';
import { Movies } from 'src/movies/typeorm/Movies';


@Module({
  imports: [TypeOrmModule.forFeature([Movies])],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MoviesModule {}