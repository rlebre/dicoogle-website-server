import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateDownloadRequestDto } from './dtos/create-download-request.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { DownloadRequest } from './entities/download-request.entity';
import { User } from './entities/user.entity';

@Injectable()
export class DownloadRequestService {
    constructor(@InjectRepository(DownloadRequest) private readonly downloadRequestRepository: Repository<DownloadRequest>, @InjectRepository(User) private readonly userRepository: Repository<User>, private mailService: MailService) { }

    async create(downloadRequest: CreateDownloadRequestDto & CreateUserDto): Promise<DownloadRequest> {
        const newUser = this.userRepository.create(downloadRequest);
        const newDownloadRequest = this.downloadRequestRepository.create(downloadRequest);
        const user = await this.userRepository.save(newUser);

        newDownloadRequest.user = user;
        newDownloadRequest.hash = randomUUID();
        newDownloadRequest.downloadLink = `${process.env.BASE_URL}/download/${newDownloadRequest.hash}`;
        this.mailService.sendDownloadLink(newDownloadRequest);

        return this.downloadRequestRepository.save(newDownloadRequest)
    }

    async getLink(hash: string): Promise<DownloadRequest> {
        const downloadLink = await this.downloadRequestRepository.findOneByOrFail({ hash });
        if (!downloadLink.approved) {
            throw new UnauthorizedException();
        }

        downloadLink.downloadCount++;
        await this.downloadRequestRepository.save(downloadLink);

        return downloadLink;
    }
}
