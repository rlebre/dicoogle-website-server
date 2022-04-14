import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DownloadRequest } from "./download-request.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
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
}