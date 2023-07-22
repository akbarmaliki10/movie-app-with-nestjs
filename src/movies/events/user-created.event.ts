import { CreateMovieDto } from "../dto/CreateMovie.dto";

export class UserCreatedEvent {
    constructor(public readonly createMovieDto: CreateMovieDto){};
}