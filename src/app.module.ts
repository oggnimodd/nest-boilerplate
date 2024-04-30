import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { PostService } from "./post/post.service";
import { PostController } from "./post/post.controller";
import { PostModule } from "./post/post.module";
import { PrismaModule, PrismaService } from "./prisma";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostModule,
    PrismaModule,
  ],
  controllers: [AppController, PostController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    AppService,
    PostService,
    PrismaService,
  ],
})
export class AppModule {}
