import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import setupTests from "./setup-tests";

let app: INestApplication;

describe("Browser Info (e2e)", () => {
    beforeEach(async () => {
        app = await setupTests();
    });

    describe("/auth (POST)", () => {
        test("Vaild password", async () => {
            const response = await request(app.getHttpServer()).post("/auth").send({password: "123"});

            expect(response.status).toBe(201);
            expect(typeof response.body).toBe("object");
            expect(typeof response.body.token).toBe("string");

        });

        test("Invalid password", async () => {
            const response = await request(app.getHttpServer()).post("/auth").send({password: "test"});

            expect(response.status).toBe(401);
        });
    });

    test("/create (POST)", async () => {
        const response = await request(app.getHttpServer()).post("/create").send({password: "555"});

        expect(response.status).toBe(201);
        expect(typeof response.body).toBe("object");

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("password");
    });
});
