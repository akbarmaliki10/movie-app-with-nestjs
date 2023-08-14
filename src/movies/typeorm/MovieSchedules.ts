import { Column, Double, Entity, GeoJSON, IntegerType, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Orders } from "./Orders";
import { Movies } from "./Movies";
import { OrderItems } from "./OrderItems";
import { type } from "os";
import { Studios } from "./Studios";

@Entity()
export class MovieSchedules {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "movie_schedules_id"
    })
    id: Number

    @ManyToOne(type => Movies, movie_id => movie_id.movie_schedules, {onDelete: "CASCADE"})
    movie_id: Movies

    @OneToMany(type => OrderItems, order_items_id => order_items_id.movie_schedules_id)
    order_items_id : OrderItems[]

    @ManyToOne(type => Studios, studios_id => studios_id.movie_schedules_id)
    studios_id : Studios

    @Column()
    start_time: string

    @Column()
    end_time: string

    @Column()
    price: number

    @Column()
    date: Date

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