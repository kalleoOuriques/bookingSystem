import { Module } from '@nestjs/common';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './provider/apartments.service';
import { Apartment } from './apartment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
  exports: [ApartmentsService],
  imports: [TypeOrmModule.forFeature([Apartment])]
})
export class ApartmentsModule {}
