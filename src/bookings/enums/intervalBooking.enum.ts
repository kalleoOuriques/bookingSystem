import { IsISO8601, IsNotEmpty } from "class-validator";


export class IntervalBooking{

    @IsNotEmpty()
    @IsISO8601()
    checkin: Date;

    @IsNotEmpty()
    @IsISO8601()
    checkout: Date;
}