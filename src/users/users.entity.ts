import * as moment from "moment";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}
