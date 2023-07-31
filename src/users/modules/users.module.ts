import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/users.entity';
import { UserController } from '../controllers/user.controller';
import { Movies } from 'src/movies/typeorm/Movies';

@Module({
    providers: [UsersService],
    imports: [TypeOrmModule.forFeature([User, Movies])],
    controllers: [UserController]
})
export class UsersModule {}
