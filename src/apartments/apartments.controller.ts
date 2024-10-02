import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateApartmentDTO } from './dtos/create-apartment.dto';
import { ApartmentsService } from './provider/apartments.service';
import { UpdateApartmentDto } from './dtos/update-apartment.dto';

@Controller('apartments')
export class ApartmentsController {
    constructor(
        private readonly apartmentsService: ApartmentsService
    ){}
    
    @Post()
    public createApartment(@Body() createApartmentDto: CreateApartmentDTO){
        return this.apartmentsService.createApartment(createApartmentDto);
    }

    @Patch()
    public updateApartment(@Body() updateApartmentDto: UpdateApartmentDto){
        return this.apartmentsService.updateApartment(updateApartmentDto);
    }

    @Get()
    public getAllApartments(){
        return this.apartmentsService.getAllApartments();
    }

    @Delete('delete/:id')
    public deleteApartment(@Param('id', ParseIntPipe) id: number){
        return this.apartmentsService.deleteApartment(id);
    }
}
