import { Type } from "class-transformer";
import { IsEnum, IsISO8601, IsNotEmpty } from "class-validator";
import { Payment } from "src/payments/payment.entity";
import { statusBooking } from "../enums/statusBooking.enum";

export class CreateBookingDto {

    @IsISO8601()
    @IsNotEmpty()
    startdate: Date;

    @IsISO8601()
    @IsNotEmpty()
    enddate: Date;

    @IsEnum(statusBooking)
    @IsNotEmpty()
    status: statusBooking;

    @IsNotEmpty()
    @Type(()=> Number)
    clientId: number;

    @IsNotEmpty()
    @Type(()=>Number)
    apartmentId:number;

    @IsNotEmpty()
    @Type(()=>Payment)
    payment: Payment;

    

}