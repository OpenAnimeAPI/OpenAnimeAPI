import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    Unique
} from 'typeorm';
import AnimeCharacter from './AnimeCharacter.js';
import AnimeStudio from './AnimeStudio.js';

export enum AnimeStatus {
    AIRING = "airing",
    UPCOMING = "upcoming",
    FINISHED = "finished"
};

@Entity('anime')
@Unique(['title'])
class Anime extends BaseEntity {

    constructor(
        id: number,
        title: string,
        description: string,
        format: string,
        episodes: number,
        status: string,
        start_date: Date,
        end_date: Date,
        created_at: Date,
        updated_at: Date,

        anime_character: AnimeCharacter,
        anime_studio: AnimeStudio
    ) {
        super();

        this.id = id;
        this.title = title;
        this.description = description;
        this.format = format;
        this.episodes = episodes;
        this.status = status;
        this.start_date = start_date;
        this.end_date = end_date;
        this.created_at = created_at;
        this.updated_at = updated_at;

        /* Relationships */
        this.anime_character = anime_character;
        this.anime_studio = anime_studio;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    title: string;

    @Column({ type : "varchar", length: 255, nullable: false })
    description: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    format: string;

    @Column({ type: "int" })
    episodes: number;

    @Column({ type: "enum", enum: AnimeStatus, default: AnimeStatus.UPCOMING })
    status: string;

    @Column({ type: "timestamptz" })
    start_date: Date

    @Column({ type: "timestamptz" })
    end_date: Date

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    /* Relationships */
    @OneToMany(
        () => AnimeCharacter,
        (anime_character: AnimeCharacter) => anime_character.anime
    )
    anime_character: AnimeCharacter;

    @OneToMany(
        () => AnimeStudio,
        (anime_studio: AnimeStudio) => anime_studio.anime
    )
    anime_studio: AnimeStudio;
};

export default Anime;