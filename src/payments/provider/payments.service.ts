import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payment } from '../payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { UpdatePaymentDto } from '../dtos/update-payment.dto';
import { paymentType } from '../enums/paymentType.enum';
import { PaymentNotFoundException } from '../exceptions/payment-not-found.exception';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>
    ){}

    public async createPayment(createPaymentDto: CreatePaymentDto){

        try{
            var newPayment = this.paymentRepository.create(createPaymentDto);
            newPayment = await this.paymentRepository.save(newPayment);
        
        } catch (error) {
            
            throw new RequestTimeoutException(error,
                {
                    description: "Error connecting to the database"
                })
        }
        return newPayment;

    }

    public async updatePayment(updatePaymentDto: UpdatePaymentDto){
        
        try{
            var payment = await this.paymentRepository.findOneBy({id: updatePaymentDto.id})
        
        } catch (error) {
            throw new RequestTimeoutException(error,
                {
                    description: "Error connecting to the database"
                }
            )
        }

        if(payment){
            payment.amount = updatePaymentDto.amount ? updatePaymentDto.amount : payment.amount;
            payment.date = updatePaymentDto.date ? updatePaymentDto.date : payment.date;
            payment.status = updatePaymentDto.status ? updatePaymentDto.status : payment.status;
            payment.type = updatePaymentDto.type ? updatePaymentDto.type : payment.type;
            
            return this.paymentRepository.update(
                {id: payment.id},
                payment
            )
        }

        throw new PaymentNotFoundException(
            "Payment not found"
        )
    }
}
