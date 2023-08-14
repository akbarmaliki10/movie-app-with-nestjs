import * as moment from "moment";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { MovieTags } from "./MovieTags";
import { MovieSchedules } from "./MovieSchedules";

@Entity()
export class Movies {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "movies_id"
    })
    id: Number

    @Column({
        unique: true
    })
    title: string

    @Column({
        type: "longtext"
    })
    overview: string

    @Column({
        name: "vote_average",
        type: "double",
        default: -1
    })
    vote_average: number

    @Column({
        name: "upload_time",
        default: "1988-01-01"
    })
    upload_time: Date

    @Column({
        name: "release_date",
        default: "1988-01-01"
    })
    release_date: Date

    @Column({
        default: "1988-01-01"
    })
    updated_at: Date

    @Column({
        default: "1988-01-01"
    })
    deleted_at: Date
    
    @OneToMany(type => MovieTags, movie_tags => movie_tags.movie_id)
    movie_tags: MovieTags[]

    @OneToMany(type => MovieSchedules, movie_schedule => movie_schedule.movie_id)
    movie_schedules : MovieSchedules[]
}