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

    @Column()
    overview: string

    @Column({
        name: "play_until"
    })
    play_until: Date

    @Column({
        name: "created_at"
    })
    created_at: Date
    
}