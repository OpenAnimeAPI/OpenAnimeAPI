import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    Unique,
    JoinTable
} from 'typeorm';
import Character from './Character.js';
import Studio from './Studio.js';

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

        characters: Character[],
        studios: Studio[]
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
        this.characters = characters;
        this.studios = studios;
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

    @Column({ 
        type: "enum", 
        enum: AnimeStatus, 
        default: AnimeStatus.UPCOMING
    })
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
    @ManyToMany(
        () => Character,
        (character: Character) => character.anime
    )
    @JoinTable()
    characters: Character[];

    @OneToMany(
        () => Studio,
        (studio: Studio) => studio.anime
    )
    studios: Studio[];
};

export default Anime;