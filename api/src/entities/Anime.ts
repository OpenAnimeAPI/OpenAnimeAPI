import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
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

export enum AnimeFormat {
    TELEVISION = "TV",
    TELEVISION_SHORT = "TV short",
    MOVIE = "movie",
    SPECIAL = "special",
    ORIGINAL_VIDEO_ANIMATION = "ova",
    ORIGINAL_NET_ANIMATION = "ona",
    MUSIC = "music"
};

export enum AnimeSeason {
    SPRING = "spring",
    SUMMER = "summer",
    FALL = "fall",
    WINTER = "winter"
};

export enum AnimeSource {
    LIGHT_NOVEL = "light novel",
    WEB_NOVEL = "web novel",
    NOVEL = "novel",
    ANIME = "anime",
    VISUAL_NOVEL = "visual novel",
    VIDEO_GAME = "video game",
    DOUJINSHI = "doujinshi",
    COMIC = "comic",
    MANGA = "manga",
    LIVE_ACTION = "live action",
    GAME = "game",
    MULTIMEDIA_PROJECT = "multimedia project",
    PICTURE_BOOK = "picture book",
    OTHER = "other"
};

/**
 * Represents an anime entity.
 */
@Entity('anime')
@Unique(['title_english'])
@Unique(['title_romaji'])
@Unique(['title_native'])

class Anime extends BaseEntity {

    constructor(
        id: number,
        title_english: string,
        title_romaji: string,
        title_native: string,
        description: string,
        format: AnimeFormat,
        episodes: number,
        episode_duration: number,
        source: AnimeSource,
        status: AnimeStatus,
        release_year: number,
        start_date: Date,
        end_date: Date,
        created_at: Date,
        updated_at: Date,

        characters: Character[],
        studio: Studio
    ) {
        super();

        this.id = id;
        this.title_english = title_english;
        this.title_romaji = title_romaji;
        this.title_native = title_native;
        this.description = description;
        this.format = format;
        this.episodes = episodes;
        this.episode_duration = episode_duration;
        this.source = source;
        this.status = status;
        this.release_year = release_year;
        this.start_date = start_date;
        this.end_date = end_date;
        this.created_at = created_at;
        this.updated_at = updated_at;

        /* Relationships */
        this.characters = characters;
        this.studio = studio;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    title_english: string;

    @Column({ type: "varchar", length: 255 })
    title_romaji: string;

    @Column({ type: "varchar", length: 255 })
    title_native: string;

    @Column({ type : "varchar", length: 255 })
    description: string;

    @Column({ 
        type: "enum", 
        enum: AnimeFormat,
        default: AnimeFormat.TELEVISION
    })
    format: AnimeFormat;

    @Column({ type: "int" })
    episodes: number;

    @Column({ type: "int" })
    episode_duration: number; // Duration calculated in minutes

    @Column({
        type: "enum",
        enum: AnimeSource,
        default: AnimeSource.MANGA
    })
    source: AnimeSource;

    @Column({ 
        type: "enum", 
        enum: AnimeStatus, 
        default: AnimeStatus.UPCOMING
    })
    status: AnimeStatus;

    @Column({ type: "int" })
    release_year: number;

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
    @JoinTable({ name: "anime_characters" })
    characters: Character[];

    @ManyToOne(
        () => Studio,
        (studio: Studio) => studio.anime
    )
    studio: Studio;
};

export default Anime;