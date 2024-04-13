import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne
} from 'typeorm';
import Anime from './Anime.js';

/**
 * Represents a studio entity.
 */
@Entity('studios')
class Studio extends BaseEntity {

    constructor(
        id: number,
        name: string,
        created_at: Date,
        updated_at: Date,

        anime: Anime[]
    ) {
        super();

        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at;

        /* Relationships */
        this.anime = anime;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /* Relationships */
    @OneToMany(
        () => Anime,
        (anime: Anime) => anime.studio
    )
    anime: Anime[];
};

export default Studio;