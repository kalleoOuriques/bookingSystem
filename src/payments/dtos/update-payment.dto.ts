import { IsEnum, IsInt, IsISO8601, IsNotEmpty, IsOptional } from "class-validator";
import { paymentType } from "../enums/paymentType.enum";
import { paymentStatus } from "../enums/paymentStatus.enum";
import { Type } from "class-transformer";

export class UpdatePaymentDto {

    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsOptional()
    @Type(()=> Number)
    amount?: number

    @IsOptional()
    @IsEnum(paymentType)
    type?: paymentType;

    @IsOptional()
    @IsEnum(paymentStatus)
    status?: paymentStatus;

    @IsOptional()
    @IsISO8601()
    date?: Date;

}