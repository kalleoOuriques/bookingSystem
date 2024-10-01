import { paymentType } from "../enums/paymentType.enum";
import { paymentStatus } from "../enums/paymentStatus.enum";
import { IsEnum, IsISO8601, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreatePaymentDto{


    @IsNotEmpty()
    @Type(()=> Number)
    amount: number;

    @IsNotEmpty()
    @IsEnum(paymentType)
    type: paymentType;

    @IsNotEmpty()
    @IsEnum(paymentStatus)
    status: paymentStatus;

    @IsISO8601()
    @IsOptional()
    date?: Date;


}