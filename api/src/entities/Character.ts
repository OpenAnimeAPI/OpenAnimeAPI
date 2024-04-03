import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';
import Anime from './Anime.js';
import VoiceActor from './VoiceActor.js';

export enum CharacterType {
    MAIN = "main",
    SUPPORTING = "supporting"
};

@Entity('characters')
class Character extends BaseEntity {

    constructor(
        id: number,
        first_name: string,
        last_name: string,
        type: string,
        created_at: Date,
        updated_at: Date,

        anime: Anime[],
        voice_actors: VoiceActor[]
    ) {
        super();

        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.type = type;
        this.created_at = created_at;
        this.updated_at = updated_at;

        /* Relationship Fields */
        this.anime = anime;
        this.voice_actors = voice_actors;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    first_name: string;

    @Column({ type: "varchar", length: 255 })
    last_name: string;

    @Column({ type: "enum", enum: CharacterType, default: CharacterType.MAIN })
    type: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /* Relationships */
    @ManyToMany(
        () => Anime,
        (anime: Anime) => anime.characters,
        { cascade: true, onDelete: "SET NULL" }
    )
    anime: Anime[];

    @ManyToMany(
        () => VoiceActor,
        (voice_actor: VoiceActor) => voice_actor.characters
    )
    @JoinTable({ name: "character_voice_actors" })
    voice_actors: VoiceActor[];
};

export default Character;