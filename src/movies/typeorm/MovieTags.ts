import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Movies } from "./Movies";
import { Tags } from "./Tags";

@Entity()
export class MovieTags {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "movies_tags_id"
    })
    id: Number

    @ManyToOne(type => Movies, movie_id => movie_id.movie_tags)
    movie_id: string


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

    @ManyToOne(type => Tags, tags => tags.movie_tags_id)
    tags_id: Tags
}