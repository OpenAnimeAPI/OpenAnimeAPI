import type { Application } from 'express';
import type { VoiceActorExtraParams } from '@@tests/support/types/extraParams.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { VoiceActor } from '@@entities/index.js';
import * as PAYLOADS from '@@tests/support/payloads/voiceActor.payloads.js';

function getRoute(baseEndpoint: string, app: Application, extraParams: VoiceActorExtraParams) {

    /* Setup DB Rows */
    beforeAll(async () => {
        const repository = AppDataSource.getRepository(VoiceActor);
        const entity = repository.create(PAYLOADS.VALID_CREATE);
        extraParams.entity = await entity.save();
    });

    /* Cleanup */
    afterAll(async () => {
        await AppDataSource.getRepository(VoiceActor).remove(extraParams.entity as VoiceActor);
    });

    describe("index", () => {
        it("should return a 200 status and paginated voice actors", async () => {
            const endpoint = baseEndpoint;

            const { body, statusCode } = await supertest(app)
            .get(endpoint)
            .send()

            expect(statusCode).toBe(200);
            expect(body.results).not.toBeNull();

            const { results } = body;

            expect(body).toEqual({
                count: body.count,
                next: null,
                previous: null,
                results: [{
                    ...extraParams.entity,
                    updated_at: results[0].updated_at,
                    created_at: results[0].created_at
                }]
            });
        });
    });

    describe("given the id as a param", () => {
    
    });
};

export default getRoute;