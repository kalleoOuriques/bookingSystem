import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { paymentType } from "./enums/paymentType.enum";
import { paymentStatus } from "./enums/paymentStatus.enum";

@Entity()
export class Payment{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "int",
        nullable: false
    })
    amount: number;
    
    @Column({
        type: "enum",
        enum: paymentType,
        nullable: true,
    })
    type?: paymentType;

    @Column({
        type: "enum",
        enum: paymentStatus,
        nullable: false,
        default: paymentStatus.WAITING
    })
    status: paymentStatus;

    @Column({
        type: "timestamp",
        nullable: true
    })
    date?: Date;
}