import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Movies } from "./Movies";
import { MovieTags } from "./MovieTags";

@Entity()
export class Tags {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "tags_id"
    })
    id: Number

    @ManyToOne(type => Movies, movie_id => movie_id.movie_tags)
    name: string

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

    @OneToMany(type => MovieTags, movie_tags_id => movie_tags_id.tags_id)
    movie_tags_id: MovieTags[]
}