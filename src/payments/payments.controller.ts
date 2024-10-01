import { Controller, Patch, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { PaymentsService } from './provider/payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(
        private readonly paymentsService: PaymentsService
    ){}

    @Post()
    public createPayment(createPaymentDto: CreatePaymentDto){

        return this.paymentsService.createPayment(createPaymentDto);
    }

    @Patch()
    public updatePayment(updatePaymentDto: UpdatePaymentDto){

        return this.paymentsService.updatePayment(updatePaymentDto);
    }
}
