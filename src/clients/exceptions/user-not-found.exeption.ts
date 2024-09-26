export class UserNotFoundException extends Error{
    statusCode: number;
    constructor(message:string){

        super(message);
        this.name = "UserNotFoundException"
        this.statusCode = 404

    }
}