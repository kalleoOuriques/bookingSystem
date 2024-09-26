export class UserAlreadyExistsException extends Error {
    statusCode: number;

    constructor(message:string){
        
        super(message);
        this.name = 'UserAlreadyExistsException';
        this.statusCode = 409

    }
}