import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DownloadRequestController } from './download-request.controller';
import { DownloadRequest } from './download-request.entity';
import { DownloadRequestService } from './download-request.service';
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, DownloadRequest])],
    providers: [DownloadRequestService],
    controllers: [DownloadRequestController],
})
export class DownloadRequestModule { }
