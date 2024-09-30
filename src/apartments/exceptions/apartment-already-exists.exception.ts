
export class ApartmentAlreadyExists extends Error {
    statusCode: number;

    constructor(message){
        super(message)
        this.name = "ApartmentAlreadyExists"
        this.statusCode = 409
    }
}