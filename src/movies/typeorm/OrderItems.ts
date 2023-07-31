import { Column, Double, Entity, GeoJSON, IntegerType, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "src/users/typeorm/users.entity";
import { Orders } from "./Orders";
import { type } from "os";
import { MovieSchedules } from "./MovieSchedules";

@Entity()
export class OrderItems {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "order_items_id"
    })
    id: Number

    @ManyToOne(type => Orders, order_id => order_id)
    order_id: Orders

    @ManyToOne(type => MovieSchedules, movie_schedule_id => movie_schedule_id.order_items_id)
    movie_schedules_id : MovieSchedules

    @Column()
    qty: number

    @Column()
    price: number

    @Column()
    sub_total_price: number

    @Column()
    snapshots: string

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