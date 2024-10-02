import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Apartment{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type: "varchar",
        length: 32,
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        type: "smallint",
        nullable: false
    })
    people: number;

    @Column({
        type: "varchar",
        nullable: false
    })
    rooms: number;
}