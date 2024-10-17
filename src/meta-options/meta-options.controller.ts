import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionsDTO } from './dtos/create-post-meta-optios.dto';

@Controller('meta-options')
export class MetaOptionsController {

    constructor(
        private readonly metaOptionService: MetaOptionsService
    ){}

    @Post()
    public createMetaOption(@Body() createPostMetaOptionsDTO: CreatePostMetaOptionsDTO){
        return this.metaOptionService.createMetaOptions(createPostMetaOptionsDTO)
    }
}
