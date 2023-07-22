import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from 'src/movies/controllers/movie.controller';
import { MovieService } from 'src/movies/services/movie.service';
import { Movies } from 'src/movies/typeorm/Movies';


@Module({
  imports: [TypeOrmModule.forFeature([Movies]), EventEmitterModule.forRoot(), ScheduleModule.forRoot()],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MoviesModule {}