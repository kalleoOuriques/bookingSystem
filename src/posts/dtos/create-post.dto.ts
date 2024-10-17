import { IsArray, IsDate, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested, isArray, isURL } from "class-validator";
import { PostType } from "../enums/postType.enum";
import { PostStatus } from "../enums/postStatus.enum";
import { CreatePostMetaOptionsDTO } from "../../meta-options/dtos/create-post-meta-optios.dto";
import { Type } from "class-transformer";
import { ApiProduces, ApiProperty } from "@nestjs/swagger";



export class CreatePostDto{
    @ApiProperty({
        example: "This is a tittle",
        description: 'This is the title for the post',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(512)
    title: string;

    @ApiProperty({
        enum: PostType,
        description: 'Post type description',
    })
    @IsNotEmpty()
    @IsEnum(PostType)
    postType: PostType;

    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @Matches(/ˆ[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"'
    })
    slug: string;

    @IsNotEmpty()
    @IsEnum(PostStatus)
    status: PostStatus;

    @IsString()
    @IsOptional()
    content?: string;

    @IsOptional() 
    @IsJSON()  
    schema?: string;

    
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;

    @IsISO8601()
    @IsOptional()
    publishOn?: Date;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    @MinLength(3, {each: true})
    tags?: string[];

    
    @IsOptional()
    @IsArray()
    @ValidateNested({each: true}) // Some logic as the iString with an array, but is used with Type decorator,
    @Type(()=> CreatePostMetaOptionsDTO) // conducts the function that should be true
    metaOptions?: CreatePostMetaOptionsDTO[];

}