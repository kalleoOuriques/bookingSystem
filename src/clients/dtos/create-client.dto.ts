import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

// Considered that books could come from other platforms
// So, the contract info where not needed
export class CreateClientDto{


    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(32)
    telefone: string;

    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(32)
    reg?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(32)
    firstName: string;

    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(32)
    lastName?: string;

}