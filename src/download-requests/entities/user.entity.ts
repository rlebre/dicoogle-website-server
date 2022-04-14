import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { DownloadRequest } from "./download-request.entity";

@Entity()
export class User {
    @Column()
    name: string;

    @PrimaryColumn({ unique: true })
    email: string;

    @Column()
    country: string;

    @Column()
    company: string;

    @Column({ default: 'NA' })
    interests: string;

    @Column({ default: false })
    removed: boolean;

    @OneToMany(() => DownloadRequest, downloadRequest => downloadRequest.user)
    downloadRequests: DownloadRequest[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}