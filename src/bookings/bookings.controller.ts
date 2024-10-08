import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingsService } from './provider/bookings.service';
import { SearchBookingsDto } from './dtos/search-booking.dto';

@Controller('bookings')
export class BookingsController {
    constructor(
        private readonly bookingsService: BookingsService
    ){}

    @Get("booking/:id")
    public getBooking(@Param('id', ParseIntPipe) id: number){
        return this.bookingsService.getBooking(id);
    }

    @Get("search")
    public searchBookings(@Query() searchBookingsDto: SearchBookingsDto){
        return this.bookingsService.searchBookings(searchBookingsDto);
    }

    @Post()
    public createBooking(@Body() createBookingDto: CreateBookingDto){
        return this.bookingsService.createBooking(createBookingDto);
    }


    @Delete(":id")
    public deleteBooking(@Param('id', ParseIntPipe) id: number){
        return this.bookingsService.deleteBooking(id);
    }
}
