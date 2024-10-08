import { IsEnum, IsISO8601, IsNumber, IsOptional } from "class-validator";
import { statusBooking } from "../enums/statusBooking.enum";
import { Type } from "class-transformer";

export class SearchBookingsDto{

    @IsOptional()
    @IsISO8601()
    checkin?: Date;

    @IsOptional()
    @IsISO8601()
    checkout?: Date;

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