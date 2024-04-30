import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { Post as PostModel } from "@prisma/client";
import {
  postCreateSchema,
  PostCreateDto,
  postDetailsSchema,
  PostDetailsDto,
} from "./post.dto";
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { zodToOpenAPI } from "nestjs-zod";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get("/:id")
  @ApiOperation({ description: "Get a post by id" })
  @ApiParam({
    name: "id",
    schema: zodToOpenAPI(postDetailsSchema.shape.id),
  })
  // async getPostById(@Param() { id }: PostDetailsDto): Promise<PostModel> {
  //   const post = await this.postService.post({ id: Number(id) });

  //   if (!post) {
  //     throw new NotFoundException("Post not found");
  //   }
  //   return post;
  // }

  @Get("feed")
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get("draft")
  async getDraftPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: false },
    });
  }

  @Get("filtered-posts/:searchString")
  async getFilteredPosts(
    @Param("searchString") searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post("post")
  @ApiOperation({ description: "Create a new post" })
  @ApiBody({ schema: zodToOpenAPI(postCreateSchema) })
  async createDraft(@Body() postData: PostCreateDto): Promise<PostModel> {
    const { title, content } = postData;
    return this.postService.createPost({
      title,
      content,
      published: false,
      author: {
        connect: {
          id: 1,
        },
      },
    });
  }

  @Put("edit/:id")
  @ApiOperation({ description: "Edit a post" })
  @ApiBody({ schema: zodToOpenAPI(postCreateSchema) })
  async publishPost(@Body() postData: PostCreateDto): Promise<PostModel> {
    const { title, content } = postData;
    return this.postService.createPost({
      title,
      content,
    });
  }
}
