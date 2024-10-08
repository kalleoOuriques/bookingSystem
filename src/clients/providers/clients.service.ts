import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../client.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from '../dtos/create-client.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { ClientAlreadyExistsException } from '../exceptions/client-already-exists.exception';
import { ClientNotFoundException } from '../exceptions/client-not-found.exeption';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>
    ){}

    public async getClient(id: number){

        try {
            var client = await this.clientRepository.findOneBy({id: id})
        } catch (error){

            throw new RequestTimeoutException(error,
                {description: "Error connecting to the database"}
            )
        }

        if (client) {
            return client
        }

        throw new ClientNotFoundException(
            "A client was not found by the id"
        )
    }

    public async searchClients(searchClientsDto){


        try {
            var listClients =  await this.clientRepository.find({
                where: searchClientsDto
            })
        } catch (error) {

            throw new RequestTimeoutException(error,{
                description: "Error connecting to the database"
            })
        }

        return listClients;
    }

    // Create a client and registrate in the database
    public async createClient(createClientDto: CreateClientDto){

        // Check database connection
        try {
            var existingClient =  await this.clientRepository.findOne({
                where: {telefone: createClientDto.telefone}
            }

            )
        } catch (error) {

            throw new RequestTimeoutException(error,
                {
                    description: "Error connecting to the database"
                }
            )
        }
        // Check unique properties
        if (existingClient){
            
            throw new ClientAlreadyExistsException(
                "Telefone wass already registered."
            )
        }    
        
        // Create and save new client
        let newClient  = this.clientRepository.create(createClientDto);
        newClient = await this.clientRepository.save(newClient);

        return newClient
        
        


    }

    // Update Client Information
    public async updateClient(updateClientDto: UpdateClientDto){
        // Check database connection
        try {
            var client = await  this.clientRepository.findOne(
                {
                    where:{telefone: updateClientDto.telefone}
                }
            )
        } catch (error) {
            throw new RequestTimeoutException(error,
                {
                    description: "Error connecting to the database"
                }
            )
        }
        
        // Update client info
        if (client) {
            client.firstName = updateClientDto.firstName ?? client.firstName;
            client.lastName = updateClientDto.lastName ?? client.lastName;
            client.reg = updateClientDto.reg ?? client.reg;
    
            return this.clientRepository.update(
                {telefone: updateClientDto.telefone}, 
                client
            )
                
        } 

        throw new ClientNotFoundException(
            "Client not found by telefone number"
        )
        
    }

    public async deleteClient(clientId: number){

        try {
            var client = await this.clientRepository.findOneBy({id: clientId});
        } catch(error){
            
            throw new RequestTimeoutException(error, {
                description: "Error connecting to the database"
                }
            )
        }

        return await this.clientRepository.delete(client);
    }

}
