import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client{

    @PrimaryGeneratedColumn()
    id: number;

    
    @Column({
        type: "varchar",
        length: 32,
        nullable: false,
        unique: true
    })
    telefone: string;


    @Column({
        type: "varchar",
        length: 32,
        nullable: true,
    })
    reg: string;

    @Column({
        type: "varchar",
        length: 32,
        nullable: false,
    })
    firstName: string;

    @Column({
        type: "varchar",
        length: 32,
        nullable: true,
    })
    lastName: string;


}