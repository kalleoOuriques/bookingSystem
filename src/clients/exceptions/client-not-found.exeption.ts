export class ClientNotFoundException extends Error{
    statusCode: number;
    
    constructor(message:string){

        super(message);
        this.name = "ClientNotFoundException"
        this.statusCode = 404

    }
}