import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import { AppModule } from "./app.module";

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle("Your API Title")
    .setDescription("Your API description")
    .setVersion("1.0")
    .addServer(`http://localhost:${PORT}/`, "Local Development Server")
    .addTag("Your API Tag")
    .build();

  const document = SwaggerModule.createDocument(app, options);

  const theme = new SwaggerTheme();

  SwaggerModule.setup(process.env.SWAGGER_PATH || "api", app, document, {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  });
  await app.listen(PORT);
}
bootstrap();
