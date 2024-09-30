export class ClientAlreadyExistsException extends Error {
    statusCode: number;

    constructor(message:string){
        
        super(message);
        this.name = 'ClientAlreadyExistsException';
        this.statusCode = 409

    }
}