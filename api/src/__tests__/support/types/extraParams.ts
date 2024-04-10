import type {
    VoiceActor
} from '@@entities/index.js';


/**
 * @param T - entity used in route spec setup
 * @param D - optional array of entities that may be needed for specific test scenarios
 */
export interface ExtraParams<T, D> {
    entity?: T,
    supportEntities?: D[]
};

export type VoiceActorExtraParams<T = unknown> = (
    ExtraParams<VoiceActor, T>
);