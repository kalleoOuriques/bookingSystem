import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateClientDto} from './dtos/create-client.dto';
import { UpdateClientDto } from './dtos/update-client.dto';
import { ClientsService } from './providers/clients.service';

@Controller('clients')
export class ClientsController {

    constructor(
        private readonly clientsService: ClientsService
    ){}

    @Post()
    public createClient(@Body() createClientDto: CreateClientDto){
        return this.clientsService.createClient(createClientDto);
    }

    @Patch()
    public updateClient(@Body() updateClientDto: UpdateClientDto){
        return this.clientsService.updateClient(updateClientDto);
    }

}
