import { ValidationPipe } from "@nestjs/common";
import { Controller, Get, Post, Delete, Body, UsePipes } from "@nestjs/common/decorators";
import { CreateMovieDto } from "src/dto/CreateMovie.dto";
import { MovieService } from "src/services/movie.service";

@Controller("movies")
export class MovieController {
  constructor(private movieService : MovieService){};

  @Get()
  getAllMovie() {
    return []
  }

  @Get(":id")
  getMovieById(){
    return {}
  }

  @Post()
  @UsePipes(ValidationPipe) //for giving better explanation in response by validating request
  createMovie(@Body() createMovieDto : CreateMovieDto){
    return this.movieService.createMovieService(createMovieDto);
  }

  @Delete(":id")
  deleteMovie(){
    return []
  }
}
