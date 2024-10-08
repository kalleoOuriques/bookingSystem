

export class ApartmentAlreadyBookedException extends Error{
    statusCode: number;

    constructor(message: string){
        super(message);
        this.name = "ApartmentAlreadyBookedException";
        this.statusCode = 409;
        
    }
}

