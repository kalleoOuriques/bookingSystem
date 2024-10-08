import { Body, Delete, Get, Injectable, Param, ParseIntPipe, Patch, Post, RequestTimeoutException } from '@nestjs/common';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Booking } from '../booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApartmentNotFoundException } from 'src/apartments/exceptions/apartment-not-found.exception.dto';
import { ClientNotFoundException } from 'src/clients/exceptions/client-not-found.exeption';
import { ClientsService } from 'src/clients/providers/clients.service';
import { ApartmentsService } from 'src/apartments/provider/apartments.service';
import {ApartmentAlreadyBookedException } from '../exceptions/apartment-already-booked.exception';
import { BookingNotFoundException } from '../exceptions/booking-not-found.exception';
import { SearchBookingsDto } from '../dtos/search-booking.dto';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
        private readonly clientsService: ClientsService,
        private readonly apartmentsService: ApartmentsService
    ){}

    public async checkValidBookingInterval(createBookingDto: CreateBookingDto){

        // Check connection
        try{
            var existingConflicts = await this.bookingRepository.findOne({
                where:{
                    apartment: {id: createBookingDto.apartmentId},
                    checkin: LessThanOrEqual(createBookingDto.checkout),
                    checkout: MoreThanOrEqual(createBookingDto.checkin)
                },
                relations : ['apartment']
            })

        } catch(error){

            throw new RequestTimeoutException(error,{
                description: "Error connecting to the database"
            })
        }

        if (existingConflicts) {

            throw new ApartmentAlreadyBookedException(
                "Apartment was already booked in that interval of time"
            )
        } 
    }

    public async createBooking(createBookingDto: CreateBookingDto){
        // Beacuse of cascade property inside Relation descorator,
        // Payment will be created together

        await this.checkValidBookingInterval(createBookingDto);
        // client id and apartment id, need a find first

        const client = await this.clientsService.getClient(createBookingDto.clientId);
        const apartment = await this.apartmentsService.getApartment(createBookingDto.apartmentId);

        // Check 
        if(!client){
            throw new ClientNotFoundException(
                "The client was not able to be found by the submitted id"
            )
        }

        if(!apartment){
            throw new ApartmentNotFoundException(
                "The apartment was not able to be found by the submitted id"
            )
        }


        let booking = this.bookingRepository.create({
            ...createBookingDto,
            client: client,
            apartment: apartment
        })

        return await this.bookingRepository.save(booking)

    }

    public async deleteBooking(bookingId: number){

        try {
            var existingBooking = await this.bookingRepository.findOneBy({id: bookingId});

        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: "Error connecting to the database"
            })
        }

        if (existingBooking) {
            return this.bookingRepository.delete(existingBooking);
        }

        throw new BookingNotFoundException(
            "A booking was not able to be found by the id"
        )
    }

    public async searchBookings(searchBookingsDto: SearchBookingsDto){

        var query = {}

        if(searchBookingsDto.checkin && searchBookingsDto.checkout){
            query["checkin"] = LessThanOrEqual(searchBookingsDto.checkout);
            query["checkout"] = MoreThanOrEqual(searchBookingsDto.checkin);
        }

        if(searchBookingsDto.apartmentId){
            query["apartment"] = {id: searchBookingsDto.apartmentId};
        }

        if(searchBookingsDto.clientId){
            query["client"] = {id: searchBookingsDto.clientId};
        }

        if(searchBookingsDto.status){
            query["status"] = searchBookingsDto.status;
        }

        try {
            var bookings = await this.bookingRepository.find({
                where: query
            })

        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: "Error connecting to the database"
            })
        }

        return bookings;
    }

    public async getBooking(bookingId: number){

        try{
            var booking = await this.bookingRepository.findOneBy({id: bookingId})

        }catch(error){
            throw new RequestTimeoutException(error, {
                description: "Error connecting to the database"
            })
        }

        if(booking){
            return booking;
        }
        
        throw new BookingNotFoundException(
            "A booking was not able to be found by the id"
        )
    }
}
