import { ValidationPipe } from "@nestjs/common";
import { Controller, Get, Post, Delete, Body, UsePipes, UseInterceptors, UploadedFile, Put } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateMovieDto } from "src/movies/dto/CreateMovie.dto";
import { MovieService } from "src/movies/services/movie.service";

@Controller("movies")
export class MovieController {
  constructor(private movieService: MovieService) { };

  @Get()
  getAllMovie() {
    return this.movieService.getAllMovie();
  }

  @Get(":id")
  getMovieById() {
    return {}
  }

  @Post()
  @UsePipes(ValidationPipe) //for giving better explanation in response by validating request
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.createMovieService(createMovieDto);
  }

  @Delete(":id")
  deleteMovie() {
    return []
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file
  }

  @Put()
  seedMovies() {
    return this.movieService.seedDB();
  }

  @Delete()
  deleteAllMovies() {
    return this.movieService.deleteAllMovie();
  }

}
