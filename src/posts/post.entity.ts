import { IsString, IsNotEmpty, isEnum } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreatePostMetaOptionsDTO } from "../meta-options/dtos/create-post-meta-optios.dto";
import { PostStatus } from "./enums/postStatus.enum";
import { PostType } from "./enums/postType.enum";
import { MetaOption } from "src/meta-options/meta-option.entity";


@Entity()
export class Post{
    
    @PrimaryGeneratedColumn()
    id: number;

    
    @Column({
        type: "varchar",
        length: 512,
        nullable: false,
    })
    title: string;

    @Column({
        type: "enum",
        enum: PostType,
        nullable: false,
        default: PostType.POST
    })
    postType: PostType;


    @Column({
        type: "varchar",
        length: 256,
        nullable: false,
        unique: true
    })
    slug: string;

    @Column({
        type: "enum",
        enum: PostStatus,
        nullable: false,
        default: PostStatus.DRAFT
    })
    status: PostStatus;

    @Column({
        type: "text",
        nullable: true
    })
    content?: string;

    @Column({
        type: "text",
        nullable: true
    }) 
    schema?: string;

    
    @Column({
        type: "varchar",
        length: 1024,
        nullable: true
    })
    featuredImageUrl?: string;

    @Column({
        type: "timestamp", // datetime in mysql
        nullable: true
    })
    publishOn?: Date;

    @OneToOne(()=>MetaOption)
    @JoinColumn() // create a metaoption id column on the post table
    metaOptions?: MetaOption;
    // work this on the future
    tags?: string[];
    
}