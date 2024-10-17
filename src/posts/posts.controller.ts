import { Controller, Get,Post, Body, Param, Patch } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';


@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(

        // Injecting Posts Service
        private readonly postsService: PostsService
    ){}

    @Get(':userid')
    public getPosts(
        @Param('userid') userId: string
    ){
        return this.postsService.findAll(userId)
    }

    @Post()
    public createPosts(@Body() createPostDto: CreatePostDto){
        return createPostDto
    }

    @Patch()
    public updatePost(@Body() updatePostDto: PatchPostDto){
        console.log(updatePostDto)
    }
}
