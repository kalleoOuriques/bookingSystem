import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength,  MinLength } from "class-validator";


export class CreateApartmentDTO{
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    @Type(()=>Number)
    people: number;

    @IsNotEmpty()
    @Type(()=>Number)
    rooms: number;
}