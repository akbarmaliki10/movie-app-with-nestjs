import { Column, Double, Entity, GeoJSON, IntegerType, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Orders } from "./Orders";
import { Movies } from "./Movies";
import { OrderItems } from "./OrderItems";
import { MovieSchedules } from "./MovieSchedules";

@Entity()
export class Studios {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "studios_id"
    })
    id: Number

    @OneToMany(type => MovieSchedules, movie_schedules_id => movie_schedules_id.studios_id)
    movie_schedules_id : MovieSchedules[]

    @Column()
    studio_number: number

    @Column()
    seat_capacity: number

    @Column({
        default: "1988-01-01"
    })
    created_at: Date

    @Column({
        default: "1988-01-01"
    })
    updated_at: Date

    @Column({
        default: "1988-01-01"
    })
    deleted_at: Date
}