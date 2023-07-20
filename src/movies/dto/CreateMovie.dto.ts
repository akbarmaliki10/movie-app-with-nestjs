import { IsNotEmpty } from "class-validator"

export class CreateMovieDto {

    @IsNotEmpty()
    title: string

    overview: string

    play_until: Date
}