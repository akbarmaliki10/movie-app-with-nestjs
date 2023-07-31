import { Module } from '@nestjs/common';
import { MovieController } from './movies/controllers/movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { entities } from './movies/typeorm';
import { MovieService } from './movies/services/movie.service';
import { MoviesModule } from './movies/modules/movies.module';
import { UsersModule } from './users/modules/users.module';
import { AuthService } from './auth/services/auth.service';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';



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
    }), MoviesModule,
    UsersModule,
    AuthModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot()
  ],
})
export class AppModule {

}
