import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

/**
 * Represents an anime entity.
 * 
 * @class Anime
 * @extends BaseEntity
 * @property {number} id - The unique identifier for the anime.
 * @property {string} title - The title of the anime.
 * @property {string} description - The description of the anime.
 * @property {string} format - The format of the anime.
 * @property {number} episodes - The number of episodes in the anime.
 * @property {string} status - The status of the anime.
 * @property {number} rating - The rating of the anime.
 * @property {Date} release_date - The release date of the anime.
 * @property {Date} start_date - The start date of the anime.
 * @property {Date} end_date - The end date of the anime.
 * @returns {Anime} - A new Anime entity.
 */
@Entity('animes')
class Anime extends BaseEntity {

    constructor(
        id: number,
        title: string,
        description: string,
        format: string,
        episodes: number,
        status: string,
        rating: number,
        release_date: Date,
        start_date: Date,
        end_date: Date
    ) {
        super();
        this.id = id;
        this.title = title;
        this.description = description;
        this.format = format;
        this.episodes = episodes;
        this.status = status;
        this.rating = rating;
        this.release_date = release_date;
        this.start_date = start_date;
        this.end_date = end_date;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    title: string;

    @Column({ type: "text", nullable: false })
    description: string;

    @Column({ type: "varchar", nullable: false })
    format: string;

    @Column({ type: "int", nullable: true })
    episodes: number;

    @Column({ type: "varchar", nullable: true })
    status: string;

    @Column({ type: "int", nullable: true })
    rating: number;

    @Column({ type: "date", nullable: true })
    release_date: Date;

    @CreateDateColumn()
    start_date: Date;

    @UpdateDateColumn()
    end_date: Date;
};

export default Anime;