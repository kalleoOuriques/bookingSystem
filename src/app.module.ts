import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentsModule } from './apartments/apartments.module';
import { PaymentsModule } from './payments/payments.module';
import { BookingsModule } from './bookings/bookings.module';
import * as dotenv from 'dotenv';

require('dotenv').config()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        autoLoadEntities: true,
        synchronize: true, // take off for production
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME
      })
    }),
    ClientsModule,
    ApartmentsModule,
    PaymentsModule,
    BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
