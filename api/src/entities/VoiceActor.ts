import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    ManyToMany,
    JoinTable
} from 'typeorm';
import Character from './Character.js';

/**
 * Represents a voice actor in the anime industry.
 */
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

        characters: Character[]
    ) {
        super();

        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.country = country;
        this.created_at = created_at;
        this.updated_at = updated_at;

        /* Relationships */
        this.characters = characters;
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
    @ManyToMany(
        () => Character,
        (character: Character) =>  character.voice_actors,
        { cascade: true, onDelete: "SET NULL" }
    )
    characters: Character[];
};

export default VoiceActor;