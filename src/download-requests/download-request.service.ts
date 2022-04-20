import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { DicoogleReleasesService } from 'src/common/dicoogle-releases.global';
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
        this.mailService.sendDownloadLink(newDownloadRequest);

        if (downloadRequest.pluginsSourceCode) {
            const pluginDownloadRequest = this.downloadRequestRepository.create({ resource: 'dicoogle-plugins-sources-v3.0.0' });
            pluginDownloadRequest.user = user;
            pluginDownloadRequest.hash = randomUUID();
            this.mailService.sendDownloadLink(pluginDownloadRequest);
            await this.downloadRequestRepository.save(pluginDownloadRequest)
        }

        return this.downloadRequestRepository.save(newDownloadRequest)
    }

    async getLink(hash: string): Promise<string> {
        const downloadLink = await this.downloadRequestRepository.findOneByOrFail({ hash });

        if (!downloadLink.approved) {
            throw new UnauthorizedException();
        }

        downloadLink.downloadCount++;
        await this.downloadRequestRepository.save(downloadLink);

        const redirectLink = DicoogleReleasesService.ghReleases[downloadLink.resource]?.downloadLink ||
            `static/${downloadLink.resource}`

        return redirectLink;
    }
}
