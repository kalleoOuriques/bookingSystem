import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/provider/users.service';

@Injectable()
export class PostsService {
    constructor(
        /*
        * Import Users Service
         */
        private readonly usersService: UsersService
    ){}

    public findAll(userId: string){
        const user = this.usersService.findOneByID(userId)
        
        return user
    }

}
