import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    OneToMany
} from 'typeorm';
import AnimeCharacter from './AnimeCharacter.js';
import AnimeCharacterVoiceActor from './AnimeCharacterVoiceActor.js';

@Entity('voice_actors')
@Unique(['first_name', 'last_name'])
class VoiceActor extends BaseEntity {

    constructor(
        id: number,
        first_name: string,
        last_name: string,
        country: string,
        created_at: Date,
        updated_at: Date,

        anime_character_voice_actors: AnimeCharacterVoiceActor
    ) {
        super();

        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.country = country;
        this.created_at = created_at;
        this.updated_at = updated_at;

        /* Relationships */
        this.anime_character_voice_actors = anime_character_voice_actors;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    first_name: string;

    @Column({ type: "varchar", length: 255 })
    last_name: string;

    @Column({ type: "varchar", length: 255 })
    country: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /* Relationships */
    @OneToMany(
        () => AnimeCharacterVoiceActor,
        (anime_character_voice_actors: AnimeCharacterVoiceActor) =>  anime_character_voice_actors.voice_actors
    )
    anime_character_voice_actors: AnimeCharacterVoiceActor;
};

export default VoiceActor;