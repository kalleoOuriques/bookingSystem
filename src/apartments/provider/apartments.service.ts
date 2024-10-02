import { Body, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateApartmentDTO } from '../dtos/create-apartment.dto';
import { Apartment } from '../apartment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApartmentAlreadyExists } from '../exceptions/apartment-already-exists.exception';
import { UpdateApartmentDto } from '../dtos/update-apartment.dto';
import { ApartmentNotFoundException } from '../exceptions/apartment-not-found.exception.dto';
import { throwError } from 'rxjs';

@Injectable()
export class ApartmentsService {
    constructor(
        @InjectRepository(Apartment)
        private apartmentsRepository: Repository<Apartment>
    ){}

    public async createApartment(createApartmentDto: CreateApartmentDTO){

        // Check connection
        try{
            var existingApartment = await this.apartmentsRepository.findOne({
                where: {name: createApartmentDto.name}
            })
            
        } catch (error) {

            throw new RequestTimeoutException(error, {
                description: "Error connecting to the database"
            })
            
        }

        // Check unique name
        if (existingApartment) {
            throw new ApartmentAlreadyExists(
                "An apartment with this name already exists"
            )
        }

        let newApartment = this.apartmentsRepository.create(createApartmentDto);
        newApartment = await this.apartmentsRepository.save(newApartment);

        return newApartment;
    }


    public async updateApartment(updateApartmentDto: UpdateApartmentDto){
        // Check connection
        try{
            var apartment = await this.apartmentsRepository.findOneBy({id: updateApartmentDto.id})
        } catch (error) {
            
            throw new RequestTimeoutException(error,
                {
                    description: "Error connecting to the database"
                }
            )
        }

        if (apartment) {
            apartment.people = updateApartmentDto.people ?? apartment.people;
            apartment.rooms = updateApartmentDto.rooms ?? apartment.rooms;
            apartment.name = updateApartmentDto.name ?? apartment.name;

            return this.apartmentsRepository.update(
                {id: apartment.id},
                apartment
            )
        }

        throw new ApartmentNotFoundException(
            "No apartment was found by the submitted name"
        )
    }

    public async getAllApartments(){

        try{
            var apartments = await this.apartmentsRepository.find();

        } catch (error) {

            throw new RequestTimeoutException(error,{
                description: "Error connecting to the database"
            });
        }

        return apartments;
    }  
    
    public async deleteApartment(apartmentId: number){
        try{
            var apartment = await this.apartmentsRepository.findOneBy({id : apartmentId});

        } catch (error) {

            throw new RequestTimeoutException(error, 
            {
                description: "Error connecting to the database"
            })
        }

        return this.apartmentsRepository.delete(apartment);
    }
}
