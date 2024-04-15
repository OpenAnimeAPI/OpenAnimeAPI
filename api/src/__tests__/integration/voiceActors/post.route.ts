import type { Application } from 'express';
import type { VoiceActorExtraParams } from '@@tests/support/types/extraParams.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { VoiceActor } from '@@entities/index.js';
import { truncateTable } from '@@tests/support/database.support.js';
import * as PAYLOADS from '@@tests/support/payloads/voiceActor.payloads.js';

function postRoute(baseEndpoint: string, app: Application, extraParams: VoiceActorExtraParams) {

    /* Cleanup */
    afterAll(async () => {
        try {
            const repository = AppDataSource.getRepository(VoiceActor);
            await repository.remove(extraParams.entity as VoiceActor);
            await truncateTable<VoiceActor>(repository, "voice_actors");
        }
        catch {
            throw new Error(`
                Unable to remove entity created in test suite. Make sure the test that sets 
                the 'extraParams.entity' value is not failing before properly setting the value.
            `);
        }
    });

    describe("given a VALID payload", () => {
        it("should return a 200 status and the voice actor entity", async () => {
            const endpoint = baseEndpoint;

            const { body, statusCode } = await supertest(app)
            .post(endpoint)
            .send(PAYLOADS.VALID_CREATE)

            expect(statusCode).toBe(200);
            expect(body.results).not.toBeNull();

            const { results } = body;

            expect(results.id).not.toBeNull();
            expect(results.created_at).not.toBeNull();
            expect(results.updated_at).not.toBeNull();

            expect(results).toEqual({
                id: results.id,
                first_name: PAYLOADS.VALID_CREATE.first_name,
                last_name: PAYLOADS.VALID_CREATE.last_name,
                country: PAYLOADS.VALID_CREATE.country,
                created_at: results.created_at,
                updated_at: results.updated_at
            });

            extraParams.entity = results;
        });
    });

    describe("given an INVALID payload", () => {
        it("should return a 400 status and error messages", async () => {
            const endpoint = baseEndpoint;

            const { body, statusCode } = await supertest(app)
            .post(endpoint)
            .send(PAYLOADS.INVALID_CREATE)

            expect(statusCode).toBe(400);

            expect(body.error).toBe(true);
            expect(body.message).not.toBeNull();
            expect(body.issues.length).toBeGreaterThan(0);
        });
    });
};

export default postRoute;