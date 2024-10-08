import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './provider/bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { ApartmentsModule } from 'src/apartments/apartments.module';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [TypeOrmModule.forFeature([Booking]), ClientsModule, ApartmentsModule]
})
export class BookingsModule {}
