import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class DownloadRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    resource: string;

    @Column()
    downloadLink: string;

    @Column()
    @Generated("uuid")
    hash: string;

    @Column({ default: false })
    pending: boolean;

    @Column({ default: true })
    approved: boolean;

    @Column({ default: 0 })
    downloadCount: number;

    @ManyToOne(() => User, user => user.downloadRequests, { nullable: false })
    user: User;
}