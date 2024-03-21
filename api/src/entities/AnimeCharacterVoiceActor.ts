import { 
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import AnimeCharacter from './AnimeCharacter.js';
import VoiceActor from './VoiceActor.js';

@Entity('anime_character_voice_actors')
class AnimeCharacterVoiceActor extends BaseEntity {

    constructor(
        id: number,
        anime_character: AnimeCharacter,
        anime_character_voice_actors: VoiceActor,
        created_at: Date,
        updated_at: Date
    ) {
        super();

        this.id = id;
        this.anime_character = anime_character;
        this.anime_character_voice_actors = anime_character_voice_actors;
        this.created_at = created_at,
        this.updated_at = updated_at;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => AnimeCharacter,
        (anime_character: AnimeCharacter) => anime_character.anime_character_voice_actors
    )
    @JoinColumn()
    anime_character: AnimeCharacter;

    @ManyToOne(
        () => VoiceActor,
        (voice_actors: VoiceActor) =>  voice_actors.anime_character_voice_actors
    )
    @JoinColumn()
    anime_character_voice_actors: VoiceActor;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date
};

export default AnimeCharacterVoiceActor;