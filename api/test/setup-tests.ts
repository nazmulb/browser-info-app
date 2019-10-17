import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import { AppModule } from "./../src/app.module";

let app: INestApplication;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
});

afterAll(async () => {
    await app.close();
});

export default function setupTests(): Promise<INestApplication> {
    return new Promise((resolve) => {
        const f = () => {
            if (app) {
                resolve(app);
            } else {
                setTimeout(f, 50);
            }
        };
        f();
    });
}
