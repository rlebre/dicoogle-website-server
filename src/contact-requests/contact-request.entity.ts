import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContactRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    subject: string;

    @Column()
    message: string;
}