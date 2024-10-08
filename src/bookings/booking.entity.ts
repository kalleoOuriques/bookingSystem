import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { statusBooking } from "./enums/statusBooking.enum";
import { Payment } from "src/payments/payment.entity";
import { Apartment } from "src/apartments/apartment.entity";
import { Client } from "src/clients/client.entity";

@Entity()
export class Booking{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "timestamp",
        nullable: false
    })
    startdate: Date;

    @Column({
        type: "timestamp",
        nullable: false
    })
    enddate: Date;

    @Column({
        type: "enum",
        enum: statusBooking,
        nullable: false,
        default: statusBooking.BOOKED
    })
    status: statusBooking;

    // client 1:N
    @ManyToOne(()=> Client, {eager: true})
    @JoinColumn()
    client: Client;

    // payment Each booking has only one payment
    @OneToOne(()=>Payment, 
    {
        cascade: true, // Strict relation between operations
        eager: true,
        onDelete: "CASCADE" // 
    })
    @JoinColumn()
    payment: Payment;

    // apartment Many to one -> Many bookings to 1 ap
    @ManyToOne(()=>Apartment, {eager: true})
    @JoinColumn() // FK will be at this side
    apartment: Apartment;

}