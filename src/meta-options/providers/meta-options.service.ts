import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDTO } from '../dtos/create-post-meta-optios.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';


// create method, post endpoint at controller
@Injectable()
export class MetaOptionsService {

    constructor(
        @InjectRepository(MetaOption)
        private metaOptionRepository: Repository<MetaOption>
    ){}    
    

    public async createMetaOptions(createPostMetaOptionsDTO: CreatePostMetaOptionsDTO){

        let newMetaOption = this.metaOptionRepository.create(createPostMetaOptionsDTO)
        newMetaOption = await this.metaOptionRepository.save(newMetaOption)

        return newMetaOption
    }

}
