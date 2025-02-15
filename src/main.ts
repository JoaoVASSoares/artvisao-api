import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const logger = new Logger("Main");
  const app = await NestFactory.create(AppModule);

  // Habilita a validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // Retorna erro se houver propriedades desconhecidas
      transform: true, // Transforma os dados para o tipo correto (ex: string para number)
    }),
  );

  const config = new DocumentBuilder().setTitle("ArtVisão API").setDescription("API criada para um projeto da faculdade").setVersion("1.0").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/swagger", app, document);

  await app.listen(3000);
  logger.log(`Microservices is listening on port 3000`);
  logger.log("API on http://localhost:3000/api/swagger");
}
bootstrap();
