import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from 'src/movies/controllers/movie.controller';
import { MovieService } from 'src/movies/services/movie.service';
import { Movies } from 'src/movies/typeorm/Movies';
import { MovieSchedules } from '../typeorm/MovieSchedules';
import { MovieTags } from '../typeorm/MovieTags';
import { OrderItems } from '../typeorm/OrderItems';
import { Orders } from '../typeorm/Orders';
import { Studios } from '../typeorm/Studios';
import { Tags } from '../typeorm/Tags';


@Module({
  imports: [TypeOrmModule.forFeature([Movies, MovieSchedules, MovieTags, OrderItems, Orders, Studios, Tags]), EventEmitterModule.forRoot(), ScheduleModule.forRoot()],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MoviesModule {}