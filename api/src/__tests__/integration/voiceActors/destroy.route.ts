import type { Application } from 'express';
import type { VoiceActorExtraParams } from '@@tests/support/types/extraParams.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { VoiceActor } from '@@entities/index.js';
import { truncateTable } from '@@tests/support/database.support.js';
import * as PAYLOADS from '@@tests/support/payloads/voiceActor.payloads.js';

function destroyRoute(baseEndpoint: string, app: Application, extraParams: VoiceActorExtraParams) {

        /* Setup DB Rows */
    beforeAll(async () => {
        const repository = AppDataSource.getRepository(VoiceActor);
        const entity = repository.create(PAYLOADS.VALID_CREATE);
        extraParams.entity = await entity.save();
    });

    /* Cleanup */
    afterAll(async () => {
        const repository = AppDataSource.getRepository(VoiceActor);
        await repository.remove(extraParams.entity as VoiceActor);
        await truncateTable<VoiceActor>(repository, "voice_actors");
    });
    
    describe("given the id as a param", () => {
        describe("given the id DOES exist", () => {
            it("should return a 200 status and the deleted voice actor entity", async () => {
                const endpoint = `${baseEndpoint}/id/${extraParams.entity?.id}`;

                const { body, statusCode } = await supertest(app)
                .delete(endpoint)
                .send()

                expect(statusCode).toBe(200);
                expect(body.results).not.toBeNull();

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.created_at).not.toBeNull();
                expect(results.updated_at).not.toBeNull();

                expect(results).toEqual({
                    first_name: extraParams.entity?.first_name,
                    last_name: extraParams.entity?.last_name,
                    country: extraParams.entity?.country,
                    created_at: results.created_at,
                    updated_at: results.updated_at
                });
            });
        });

        describe("given the id DOES NOT exist", () => {
            it("should return a 404 status code", async () => {
                const endpoint = `${baseEndpoint}/id/81729347`;

                await supertest(app)
                .delete(endpoint)
                .send()
                .expect(404)
            });
        });
    });
};

export default destroyRoute;