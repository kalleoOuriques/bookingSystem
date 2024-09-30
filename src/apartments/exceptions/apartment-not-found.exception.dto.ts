
export class ApartmentNotFoundException extends Error {
    statusCode: number;

    constructor(message){
        super(message);
        this.name = "ApartmentNotFoundException";
        this.statusCode = this.statusCode;
    }
}