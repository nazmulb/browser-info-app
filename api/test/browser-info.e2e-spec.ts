import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import setupTests from "./setup-tests";

let app: INestApplication;

describe("Browser Info (e2e)", () => {
    beforeEach(async () => {
        app = await setupTests();
    });

    describe("/push (POST)", () => {
        test("Sendig data from Chrome with local IP and lang", async () => {
            const response = await request(app.getHttpServer()).post("/push").send({
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
                ipAddresses: "192.168.0.100",
                acceptLanguage: "en-US",
            });

            expect(response.status).toBe(201);
            expect(typeof response.body).toBe("object");

            expect(response.body.userAgent).toBe("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36");
            expect(response.body.browserType).toBe("Chrome");
            expect(response.body.osType).toBe("Mac Os X");
            expect(response.body.browserVersion).toBe("77");
            expect(response.body.acceptLanguage).toBe("en-US");
            expect(response.body.ipAddresses).toContain("192.168.0.100");

            expect(response.body).toHaveProperty("id");
            expect(typeof response.body.id).toBe("number");

            expect(response.body).toHaveProperty("createdAt");
            expect(typeof response.body.createdAt).toBe("string");
        });
    });

    test("/pull (GET)", async () => {
        const response = await request(app.getHttpServer()).get("/pull").query({
            browserType: "Chrome", osType: "Mac Os X", browserVersion: "77",
        });

        expect(response.status).toBe(200);
        expect(typeof response.body).toBe("object");

        if (Object.keys(response.body).length) {
            expect(response.body.browserType).toBe("Chrome");
            expect(response.body.osType).toBe("Mac Os X");
            expect(response.body.browserVersion).toBe("77");

            expect(response.body).toHaveProperty("id");
            expect(typeof response.body.id).toBe("number");

            expect(response.body).toHaveProperty("userAgent");
            expect(typeof response.body.userAgent).toBe("string");

            expect(response.body).toHaveProperty("acceptLanguage");
            expect(typeof response.body.acceptLanguage).toBe("string");

            expect(response.body).toHaveProperty("ipAddresses");
            expect(typeof response.body.ipAddresses).toBe("string");

            expect(response.body).toHaveProperty("createdAt");
            expect(typeof response.body.createdAt).toBe("string");
        }
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
