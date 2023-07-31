import { Controller, Get, Post, Delete, Body, UsePipes, UseInterceptors, UploadedFile, Put, Param } from "@nestjs/common/decorators";
import { UsersService } from "../services/users.service";
import { AddFavoriteMovieDto } from "../dto/addFavoriteMovieDto";


@Controller("users")
export class UserController {
    constructor(private readonly userService: UsersService){}

    @Get(':name')
    getUserByName(@Param('name') name){
        return this.userService.getUserByName(name);
    }

    @Get('')
    getAllUser(){
        return this.userService.getAllUser();
    }

    @Post('')
    async addUsersFavoriteMovie(@Body() addFavoriteMovieDto : AddFavoriteMovieDto){
        return await this.userService.addFavoriteMovie(addFavoriteMovieDto);
    }
}