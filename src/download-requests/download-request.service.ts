import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { DownloadRequest } from './download-request.entity';
import { CreateDownloadRequestDto } from './dto/create-dl-request.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class DownloadRequestService {
    constructor(@InjectRepository(DownloadRequest) private readonly downloadRequestRepository: Repository<DownloadRequest>, @InjectRepository(User) private readonly userRepository: Repository<User>, private mailService: MailService) { }

    async create(downloadRequest: CreateDownloadRequestDto & CreateUserDto): Promise<DownloadRequest> {
        const newUser = this.userRepository.create(downloadRequest);
        const newDownloadRequest = this.downloadRequestRepository.create(downloadRequest);
        const user = await this.userRepository.save(newUser);

        newDownloadRequest.user = user;

        try {
            const dl = await this.downloadRequestRepository.save(newDownloadRequest)
            this.mailService.sendDownloadLink(dl);
            return dl;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
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
