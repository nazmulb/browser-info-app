import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import setupTests from "./setup-tests";

let app: INestApplication;
let token;

describe("Browser Info (e2e)", () => {
    beforeEach(async () => {
        app = await setupTests();
        const response = await request(app.getHttpServer()).post("/auth").send({password: "123"});
        if (Object.keys(response.body).length) {
            token = response.body.token;
        }
    });

    describe("/push (POST)", () => {
        test("Sending data from Mac/Chrome with local IP and lang", async () => {
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

        test("Sending data from Linux/Firefox with local IP and lang", async () => {
            const response = await request(app.getHttpServer()).post("/push").send({
                userAgent: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:69.0) Gecko/20100101 Firefox/69.0",
                ipAddresses: "192.168.0.100",
                acceptLanguage: "en-US",
            });

            expect(response.status).toBe(201);
            expect(typeof response.body).toBe("object");

            expect(response.body.userAgent).toBe("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:69.0) Gecko/20100101 Firefox/69.0");
            expect(response.body.browserType).toBe("Firefox");
            expect(response.body.osType).toBe("Linux");
            expect(response.body.browserVersion).toBe("69");
            expect(response.body.acceptLanguage).toBe("en-US");
            expect(response.body.ipAddresses).toContain("192.168.0.100");

            expect(response.body).toHaveProperty("id");
            expect(typeof response.body.id).toBe("number");

            expect(response.body).toHaveProperty("createdAt");
            expect(typeof response.body.createdAt).toBe("string");
        });

        test("Sending data from Windows/IE with lang", async () => {
            const response = await request(app.getHttpServer()).post("/push").send({
                userAgent: "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)",
                acceptLanguage: "en-US",
            });

            expect(response.status).toBe(201);
            expect(typeof response.body).toBe("object");

            expect(response.body.userAgent).toBe("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)");
            expect(response.body.browserType).toBe("IE");
            expect(response.body.osType).toBe("Windows");
            expect(response.body.browserVersion).toBe("9");
            expect(response.body.acceptLanguage).toBe("en-US");

            expect(response.body).toHaveProperty("id");
            expect(typeof response.body.id).toBe("number");

            expect(response.body).toHaveProperty("ipAddresses");
            expect(typeof response.body.ipAddresses).toBe("string");

            expect(response.body).toHaveProperty("createdAt");
            expect(typeof response.body.createdAt).toBe("string");
        });

        test("Sending data from Postman", async () => {
            const response = await request(app.getHttpServer()).post("/push").send({
                userAgent: "PostmanRuntime/7.1.1",
            });

            expect(response.status).toBe(201);
            expect(typeof response.body).toBe("object");

            expect(response.body.userAgent).toBe("PostmanRuntime/7.1.1");
            expect(response.body.browserType).toBe("Unknown");
            expect(response.body.osType).toBe("Unknown");
            expect(response.body.browserVersion).toBeNull();
            expect(response.body.acceptLanguage).toBeNull();

            expect(response.body).toHaveProperty("id");
            expect(typeof response.body.id).toBe("number");

            expect(response.body).toHaveProperty("ipAddresses");
            expect(typeof response.body.ipAddresses).toBe("string");

            expect(response.body).toHaveProperty("createdAt");
            expect(typeof response.body.createdAt).toBe("string");
        });

        test("Sending data without any payload", async () => {
            const response = await request(app.getHttpServer()).post("/push").send({});

            expect(response.status).toBe(201);
            expect(typeof response.body).toBe("object");

            expect(response.body).toHaveProperty("id");
            expect(typeof response.body.id).toBe("number");
        });
    });

    test("/pull (GET)", async () => {
        const response = await request(app.getHttpServer()).get("/pull").set("auth_token", token).query({
            browserType: "Chrome", osType: "Mac Os X", browserVersion: "77",
        });

        expect(response.status).toBe(200);
        expect(typeof response.body).toBe("object");

        if (Object.keys(response.body).length) {
            expect(response.body.browserType).toBe("Chrome");
            expect(response.body.osType).toBe("Mac Os X");
            expect(response.body.browserVersion).toBe("77");

            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("userAgent");
            expect(response.body).toHaveProperty("acceptLanguage");
            expect(response.body).toHaveProperty("ipAddresses");
            expect(response.body).toHaveProperty("createdAt");
        }
    });

    test("/stat (GET)", async () => {
        const response = await request(app.getHttpServer()).get("/stat").set("auth_token", token);

        expect(response.status).toBe(200);
        expect(typeof response.body).toBe("object");

        expect(response.body).toHaveProperty("insertedTime");
        expect(typeof response.body.insertedTime).toBe("string");

        expect(response.body).toHaveProperty("entriesByTypeOSVersion");
        expect(typeof response.body.entriesByTypeOSVersion).toBe("object");

        if (response.body.entriesByTypeOSVersion.length) {
            expect(typeof response.body.entriesByTypeOSVersion[0]).toBe("object");
            expect(response.body.entriesByTypeOSVersion[0]).toHaveProperty("number_of_records");
            expect(response.body.entriesByTypeOSVersion[0]).toHaveProperty("browserType");
            expect(response.body.entriesByTypeOSVersion[0]).toHaveProperty("osType");
            expect(response.body.entriesByTypeOSVersion[0]).toHaveProperty("browserVersion");
        }
    });
});
