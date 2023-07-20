import { Module } from '@nestjs/common';
import { MovieController } from '../controllers/movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { entities } from '../typeorm';
import { MovieService } from '../services/movie.service';
import { MoviesModule } from './movies.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'thanosroot',
      database: 'movies',
      entities: entities,
      synchronize: true,
    }), MoviesModule]
})
export class AppModule {

}
