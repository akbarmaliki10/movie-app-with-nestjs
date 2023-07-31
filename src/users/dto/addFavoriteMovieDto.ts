import { IsNotEmpty } from "class-validator";

export class AddFavoriteMovieDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    movieName : string
}