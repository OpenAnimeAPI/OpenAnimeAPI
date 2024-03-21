import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    OneToMany
} from 'typeorm';
import Character from './Character.js';
import Anime from './Anime.js';
import AnimeCharacterVoiceActor from './AnimeCharacterVoiceActor.js';

@Entity('anime_characters')
@Unique(['character', 'anime'])
class AnimeCharacter extends BaseEntity {

    constructor(
        id: number,
        character: Character,
        anime: Anime,
        created_at: Date,
        updated_at: Date,

        anime_character_voice_actors: AnimeCharacterVoiceActor
    ) {
        super();

        this.id = id;
        this.character = character;
        this.anime = anime;
        this.created_at = created_at;
        this.updated_at = updated_at;

        this.anime_character_voice_actors = anime_character_voice_actors;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => Character, 
        (character: Character) => character.anime_character,
        { cascade: true, onDelete: "SET NULL" }
    )
    @JoinColumn()
    character: Character;

    @ManyToOne(
        () => Anime, 
        (anime: Anime) => anime.anime_character,
        { cascade: true, onDelete: "CASCADE" } 
    )
    @JoinColumn()
    anime: Anime;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(
        () => AnimeCharacterVoiceActor,
        (anime_character_voice_actors: AnimeCharacterVoiceActor) => anime_character_voice_actors.anime_character
    )
    anime_character_voice_actors: AnimeCharacterVoiceActor;
};

export default AnimeCharacter;