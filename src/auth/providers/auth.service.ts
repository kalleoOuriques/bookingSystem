import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/provider/users.service';

@Injectable()
export class AuthService {
    constructor(

    // Injecting UsersService
    @Inject(forwardRef(()=>UsersService))
    private readonly usersService: UsersService

    ){}

    public login(email: string, password: string, id: string){
        
        const user = this.usersService.findOneByID('1234');
        // Check user exists database
        // login
        // token
        return 'SAMPLE_TOKEN';


    }

    public isAuth(){
        return true;
    }
}
