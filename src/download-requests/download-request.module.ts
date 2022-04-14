import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { DownloadRequestController } from './download-request.controller';
import { DownloadRequest } from './download-request.entity';
import { DownloadRequestService } from './download-request.service';
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, DownloadRequest]), MailModule],
    providers: [DownloadRequestService],
    controllers: [DownloadRequestController],
})
export class DownloadRequestModule { }
