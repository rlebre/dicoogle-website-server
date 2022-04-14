import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @ManyToOne(() => User, user => user.downloadRequests)
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}