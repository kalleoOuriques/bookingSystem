import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateClientDto} from './dtos/create-client.dto';
import { UpdateClientDto } from './dtos/update-client.dto';
import { ClientsService } from './providers/clients.service';
import { SearchClientDto } from './dtos/search-client.dto';


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

    @Get('client/:id?')
    public getClient(@Param('id', ParseIntPipe) id: number){
        return this.clientsService.getClient(id);
    }

    @Get('search?')
    public searchClients(
        @Query('telefone') telefone: SearchClientDto ,
        @Query('reg') reg: SearchClientDto,
        @Query('firstname') firsName: SearchClientDto,
        @Query('lastname') lastName: SearchClientDto
    ){

        return this.clientsService.searchClients(telefone, reg, firsName, lastName)
    }

}
