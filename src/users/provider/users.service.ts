import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { User } from "../user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";

@Injectable()
    export class UsersService{
        constructor(
            @Inject(forwardRef(()=>AuthService))
            private readonly authService: AuthService,
            
            @InjectRepository(User)
            private usersRepository: Repository<User>
        ){}

    public async createUser(createUserDto: CreateUserDto){
        
        // Check if user exists with the same email
        const existingUser = await this.usersRepository.findOne({
            where: {email: createUserDto.email}
        });
        // Handle Exception
        // Create a new user
        let newUser = this.usersRepository.create(createUserDto);
        newUser = await this.usersRepository.save(newUser)
        
        return newUser;
    }

    public findAll(
        getUsersParamDto: GetUsersParamDto,
        limit: number,
        page: number
    ){  
        const isAuth = this.authService.isAuth();
        console.log(isAuth)
        return [
            {
                firstName: "John",
                email: "john@doe.com"
            },
            {
                firstName: "Alice",
                email: "alice@doe.com"
            }
        ]
    }

    public findOneByID(id: string){
        return [
            {
                id: 1234,
                firstName: "John",
                email: "john@doe.com"
            }]
    }
}