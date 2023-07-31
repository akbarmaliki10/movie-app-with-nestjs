import { Movies } from "src/movies/typeorm/Movies";
import { Orders } from "src/movies/typeorm/Orders";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "user_id"
    })
    id: Number

    @Column({
        unique: true
    })
    name: string

    @Column({
    })
    email: string

    @Column({
    })
    password: string

    @ManyToMany(
        type => Movies, { cascade: true }
    )
    @JoinTable()
    movies: Movies[];

    @OneToMany(type => Orders, orders_id => orders_id.user_id)
    orders_id: Orders[]
}
