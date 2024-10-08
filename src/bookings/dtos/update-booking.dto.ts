import { IsEnum, IsISO8601, IsNotEmpty } from "class-validator";
import { statusBooking } from "../enums/statusBooking.enum";
import { Type } from "class-transformer";
import { Payment } from "src/payments/payment.entity";

export class UpdateBookingDTO{
    
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