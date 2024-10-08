export class BookingNotFoundException extends Error{
    statusCode: number;
    constructor(message:string){
        super(message);
        this.name = "BookingNotFoundException";
        this.statusCode = 404;
    }
}