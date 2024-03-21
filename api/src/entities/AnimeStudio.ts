import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Unique
} from 'typeorm';
import Studio from './Studio.js';
import Anime from './Anime.js';

@Entity('anime_studios')
@Unique(['studio', 'anime'])
class AnimeStudio extends BaseEntity {

    constructor(
        id: number,
        studio: Studio,
        anime: Anime,
        created_at: Date,
        updated_at: Date
    ) {
        super();

        this.id = id;
        this.studio = studio;
        this.anime = anime;
        this.created_at = created_at;
        this.updated_at = updated_at;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => Studio,
        (studio: Studio) => studio.anime_studio,
        { cascade: true, onDelete: "CASCADE" }
    )
    @JoinColumn()
    studio: Studio;

    @ManyToOne(
        () => Anime,
        (anime: Anime) => anime.anime_studio,
        { cascade: true, onDelete: "CASCADE" }
    )
    @JoinColumn()
    anime: Anime;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
};

export default AnimeStudio;