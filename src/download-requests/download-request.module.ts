import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleRecaptchaGuard } from 'src/common/guards/google-recaptcha.guard';
import { MailModule } from 'src/mail/mail.module';
import { DownloadRequestController } from './download-request.controller';
import { DownloadRequestService } from './download-request.service';
import { DownloadRequest } from './entities/download-request.entity';
import { User } from './entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, DownloadRequest]), MailModule, HttpModule],
    providers: [DownloadRequestService, GoogleRecaptchaGuard],
    controllers: [DownloadRequestController],
})
export class DownloadRequestModule { }
