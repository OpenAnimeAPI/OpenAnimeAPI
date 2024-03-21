import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import AnimeStudio from './AnimeStudio.js';

@Entity('studios')
class Studio extends BaseEntity {

    constructor(
        id: number,
        name: string,
        created_at: Date,
        updated_at: Date,

        anime_studio: AnimeStudio
    ) {
        super();

        this.id = id;
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at;

        /* Relationships */
        this.anime_studio = anime_studio;
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
        () => AnimeStudio,
        (anime_studio: AnimeStudio) => anime_studio.studio
    )
    anime_studio: AnimeStudio;
};

export default Studio;