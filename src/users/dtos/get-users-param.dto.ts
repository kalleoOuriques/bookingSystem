import { IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class GetUsersParamDto{
    // Puts inside the documentation, as optional 
    @ApiPropertyOptional({
        description: "Id of a specific user",
        example: 1234,
    })
    @IsOptional()
    @IsInt()
    @Type(()=> Number)
    id?: number;
}