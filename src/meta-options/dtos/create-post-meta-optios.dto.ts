import {IsString, IsNotEmpty, IsJSON} from "class-validator";


export class CreatePostMetaOptionsDTO{
    
    @IsNotEmpty()
    @IsJSON()
    metaValue: string;
}