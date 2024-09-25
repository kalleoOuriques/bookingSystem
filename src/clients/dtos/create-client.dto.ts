import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class CreateUserDto{

    @MinLength(2)
    @MaxLength(96)
    @IsString()
    telefone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(96)
    reg: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(96)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(96)
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(96)
    email: string;


}