import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from 'src/controllers/movie.controller';
import { MovieService } from 'src/services/movie.service';
import { Movies } from 'src/typeorm/Movies';


@Module({
  imports: [TypeOrmModule.forFeature([Movies])],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MoviesModule {}