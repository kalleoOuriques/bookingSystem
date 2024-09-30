import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MaxLength,  MinLength } from "class-validator";


export class UpdateApartmentDto{

    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    @MinLength(2)
    name: string;

    @IsOptional()
    @Type(()=>Number)
    people?: number;

    @IsOptional()
    @Type(()=>Number)
    rooms?: number;
}