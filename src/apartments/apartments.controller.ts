import { Controller, Patch, Post } from '@nestjs/common';
import { CreateApartmentDTO } from './dtos/create-apartment.dto';
import { ApartmentsService } from './provider/apartments.service';
import { UpdateApartmentDto } from './dtos/update-apartment.dto';

@Controller('apartments')
export class ApartmentsController {
    constructor(
        private readonly apartmentsService: ApartmentsService
    ){}
    
    @Post()
    public createApartment(createApartmentDto: CreateApartmentDTO){
        return this.apartmentsService.createApartment(createApartmentDto);
    }

    @Patch()
    public updateApartment(updateApartmentDto: UpdateApartmentDto){
        return this.apartmentsService.updateApartment(updateApartmentDto);
    }
}
