import { Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "src/users/typeorm/users.entity";
import { OrderItems } from "./OrderItems";
import "reflect-metadata";

@Entity()
export class Orders {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "orders_id"
    })
    id: Number

    @ManyToOne(type => User, user_id => user_id.orders_id)
    user_id: User

    @Column()
    payment_method: string

    @Column()
    total_item_price: number

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

    @OneToMany(type => OrderItems, order_items_id => order_items_id.order_id)
    order_items_id: OrderItems[] 
}