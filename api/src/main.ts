import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);

	const options = new DocumentBuilder()
		.setTitle("Browser Info API")
		.setDescription("Browser Info and Stat API")
		.setVersion("1.0")
		.addTag("browsers")
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup("api", app, document);

	await app.listen(8082);
}

bootstrap();
