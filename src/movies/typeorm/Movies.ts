import * as moment from "moment";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
        name: "upload_time"
    })
    upload_time: Date

    @Column({
        name: "release_date",
        default: "1988-01-01"
    })
    release_date: Date
    
}