import { z } from "zod";
import { createZodDto } from "nestjs-zod";

export const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});
export type PostCreateDto = z.infer<typeof postCreateSchema>;

export const postDetailsSchema = z.object({
  id: z.string(),
});

export class PostDetailsDto extends createZodDto(postDetailsSchema) {}
