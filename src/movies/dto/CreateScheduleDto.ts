import { IsNotEmpty } from "class-validator"

export class CreateScheduleDto {

    @IsNotEmpty()
    movieName: string

    @IsNotEmpty()
    start_time: string

    @IsNotEmpty()
    end_time: string

    @IsNotEmpty()
    price: number

    date: Date
}