import type { Application } from 'express';
import type { VoiceActorExtraParams } from '@@tests/support/types/extraParams.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { VoiceActor } from '@@entities/index.js';
import { truncateTable } from '@@tests/support/database.support.js';
import * as PAYLOADS from '@@tests/support/payloads/voiceActor.payloads.js';

function updateRoute(baseEndpoint: string, app: Application, extraParams: VoiceActorExtraParams) {

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

    describe("given a VALID payload", () => {
        it("should return a 200 status and the updated voice actor entity", async () => {
            const endpoint = `${baseEndpoint}/id/${extraParams.entity?.id}`;

            const { body, statusCode } = await supertest(app)
            .put(endpoint)
            .send({
                ...extraParams.entity,
                ...PAYLOADS.VALID_UPDATE
            });

            expect(statusCode).toBe(200);
            expect(body.results).not.toBeNull();

            const { results } = body;

            expect(results.id).not.toBeNull();
            expect(results.created_at).not.toBeNull();
            expect(results.updated_at).not.toBeNull();

            expect(results).toEqual({
                id: extraParams.entity?.id,
                first_name: PAYLOADS.VALID_UPDATE.first_name,
                last_name: PAYLOADS.VALID_UPDATE.last_name,
                country: PAYLOADS.VALID_UPDATE.country,
                created_at: results.created_at,
                updated_at: results.updated_at
            });
        });
    });

    describe("given an INVALID payload", () => {
        it("should return a 400 status and error messages", async () => {
            const endpoint = baseEndpoint;

            const { body, statusCode } = await supertest(app)
            .post(endpoint)
            .send(PAYLOADS.INVALID_UPDATE)

            expect(statusCode).toBe(400);

            expect(body.error).toBe(true);
            expect(body.message).not.toBeNull();
            expect(body.issues.length).toBeGreaterThan(0);
        });
    });
};

export default updateRoute;