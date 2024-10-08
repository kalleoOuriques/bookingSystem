import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SearchClientsDto{

    @IsString()
    @MinLength(2)
    @MaxLength(32)
    @IsOptional()
    telefone?: string;

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