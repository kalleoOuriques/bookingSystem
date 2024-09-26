import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class UpdateClientDto{

   
    @IsString()
    @MinLength(2)
    @MaxLength(32)
    @IsNotEmpty()
    telefone: string;

    @IsString()
    @MinLength(2)
    @MaxLength(32)
    @IsOptional()
    reg?: string;

    @IsString()
    @MinLength(2)
    @MaxLength(32)
    @IsOptional()
    firstName?: string;

    @IsString()
    @MinLength(2)
    @MaxLength(32)
    @IsOptional()
    lastName?: string;


}