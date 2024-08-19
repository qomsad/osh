import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

import "dotenv/config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("admin-api");

  if (process.env["NODE_ENV"] === "development") {
    const config = new DocumentBuilder()
      .setTitle("Osh project")
      .setDescription("Osh project REST API service")
      .setVersion("0.1.0")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("admin-swagger", app, document, {
      swaggerOptions: {
        filter: true,
        tryItOutEnabled: true,
        defaultModelRendering: "model",
        displayRequestDuration: true,
        defaultModelExpandDepth: 2,
        defaultModelsExpandDepth: 2,
      },
    });
  }

  await app.listen(process.env["PORT"] || 3000);
}
bootstrap();
