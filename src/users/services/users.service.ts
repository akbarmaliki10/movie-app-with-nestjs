import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/users.entity';
import { Repository } from 'typeorm';
import { AddFavoriteMovieDto } from '../dto/addFavoriteMovieDto';
import { Movies } from 'src/movies/typeorm/Movies'; 

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Movies)
        private movieRepository: Repository<Movies>
    ) {}

    async getUserByName(nameQuery : string) {
        return await this.userRepository.findOneBy({
            name : nameQuery
        })
    }

    async getAllUser(){
        return await this.userRepository.find({
            relations: {
                movies: true
            }
        });
    }

    async addFavoriteMovie(addFavoriteMovieDto : AddFavoriteMovieDto){
        const movie = await this.movieRepository.findOneBy({title:addFavoriteMovieDto.movieName})
        const user = await this.userRepository.findOne({where: {name : addFavoriteMovieDto.username}, relations : {
            movies: true
        }})

        if (user.movies == undefined){
            user.movies = [movie]
        } else {
            user.movies.push(movie);
        }
        return await this.userRepository.save(user)
    }
}
