import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import AnimeCharacter from './AnimeCharacter.js';

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

        anime_character: AnimeCharacter,
    ) {
        super();

        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.type = type;
        this.created_at = created_at;
        this.updated_at = updated_at;

        /* Relationship Fields */
        this.anime_character = anime_character;
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
    @OneToMany(
        () => AnimeCharacter,
        (anime_characters: AnimeCharacter) => anime_characters.character,
    )
    anime_character: AnimeCharacter;
};

export default Character;