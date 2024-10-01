
export class PaymentNotFoundException extends Error{
    statusCode: number;

    constructor(message){
        super(message);
        this.name = "PaymentNotFoundExceptiom";
        this.statusCode = 404
    }
}