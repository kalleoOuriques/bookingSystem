import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { statusBooking } from "../enums/statusBooking.enum";
import { IntervalBooking } from "../enums/intervalBooking.enum";
import { Type } from "class-transformer";

export class SearchBookingsDto{

    @IsOptional()
    @Type(()=>IntervalBooking)
    interval?: IntervalBooking;

    @IsOptional()
    @Type(()=>Number)
    apartmentId?: number;

    @IsOptional()
    @Type(()=>Number)
    clientId?: number;

    @IsOptional()
    @IsEnum(statusBooking)
    status?: statusBooking;

}