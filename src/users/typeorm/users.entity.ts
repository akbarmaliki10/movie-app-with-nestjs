import * as moment from "moment";
import { type } from "os";
import { Movies } from "src/movies/typeorm/Movies";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}
