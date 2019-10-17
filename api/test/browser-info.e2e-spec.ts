import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import setupTests from "./setup-tests";

const RECORD_OBJECT = expect.objectContaining([{
    number_of_records: expect.any(String),
    browserType: expect.any(String),
    osType: expect.any(String),
    browserVersion: expect.any(String),
}]);

const STAT_OBJECT = expect.objectContaining({
    insertedTime: expect.any(String),
    entriesByTypeOSVersion: expect.any(RECORD_OBJECT),
});

let app: INestApplication;

describe("Browser Info (e2e)", () => {
    beforeEach(async () => {
        app = await setupTests();
    });

    test("/pull (GET)", async () => {
        const response = await request(app.getHttpServer()).get("/pull");
        // console.dir(response.body);

        expect(response.status).toBe(200);
    });

    test("/stat (GET)", async () => {
        const response = await request(app.getHttpServer()).get("/stat");

        expect(response.status).toBe(200);
        expect(typeof response.body).toBe("object");

        expect(response.body).toHaveProperty("insertedTime");
        expect(typeof response.body.insertedTime).toBe("string");

        expect(response.body).toHaveProperty("entriesByTypeOSVersion");
        expect(typeof response.body.entriesByTypeOSVersion).toBe("object");

        if (response.body.entriesByTypeOSVersion.length) {
            expect(typeof response.body.entriesByTypeOSVersion[0]).toBe("object");

            expect(response.body.entriesByTypeOSVersion[0]).toHaveProperty("number_of_records");
            expect(typeof response.body.entriesByTypeOSVersion[0].number_of_records).toBe("string");

            expect(response.body.entriesByTypeOSVersion[0]).toHaveProperty("browserType");
            expect(typeof response.body.entriesByTypeOSVersion[0].browserType).toBe("string");

            expect(response.body.entriesByTypeOSVersion[0]).toHaveProperty("osType");
            expect(typeof response.body.entriesByTypeOSVersion[0].osType).toBe("string");

            expect(response.body.entriesByTypeOSVersion[0]).toHaveProperty("browserVersion");
            expect(typeof response.body.entriesByTypeOSVersion[0].browserVersion).toBe("string");
        }
    });
});
