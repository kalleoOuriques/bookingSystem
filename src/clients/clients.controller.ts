import { Body, Controller, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-client.dto';

@Controller('clients')
export class ClientsController {

    @Get()
    public createUser(@Body() createUserDto: CreateUserDto){
        return createUserDto
    }

    public updateUser(){

    }
}
