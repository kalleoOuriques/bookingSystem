import { Controller, 
    Get, Post, Patch,
     Put, Delete, Param, 
     Query, Body, Ip, Headers,
    ParseIntPipe, 
    ValidationPipe,
    DefaultValuePipe} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './provider/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

// Api tags -> swagger group sorted
@Controller('users')
@ApiTags('Users')
export class UsersController {

    constructor(
        // Injecting Users Service
        private readonly usersService: UsersService,
    ){}
    /**
     * Final endpoint - /users/id?limit=10&page=1
     * Param id - optional, convert to integer, cannot have a default value
     * Query limit - integer, default 10
     * Query page - integer, default value 1
     * ==> USE CASES
     * /users/ -> return all users with default pagination
     * /users/1223 -> returns one user whos id is 1223
     * /users?limit=10&page=2 -> return page 2 with limit of pagination 10
     */
    
    // All of Api decorators are used for documentation
    // Get the request, validate using dto, throws to the service
    @Get('/:id?')
    @ApiOperation({
        summary: "Fetches a list of registered users on the application"
    })
    @ApiResponse({
        status: 200,
        description: "Users fetch successfully"
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        required: false,
        description: "The number of entries returned per query",
        example: 10
    })
    @ApiQuery({
        name: 'page',
        type: 'number',
        required: false,
        description: "The position of the page number",
        example: 1,
    })
    public getUsers(
        @Param() getUsersParamDto: GetUsersParamDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ){
        
        return this.usersService.findAll(getUsersParamDto, limit, page);
        
    }

    @Post()
    public createUsers(
        @Body() createUserDto: CreateUserDto
    ) {
        
        return this.usersService.createUser(createUserDto);
    }

    // Update user
    @Patch()
    public patchUser(@Body() patchUserDto: PatchUserDto){
        return patchUserDto;

    }
}
