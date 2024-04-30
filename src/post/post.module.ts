import { PrismaService } from "@/prisma";
import { Module } from "@nestjs/common";

@Module({
  providers: [PrismaService],
})
export class PostModule {}
