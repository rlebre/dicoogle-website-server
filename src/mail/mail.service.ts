import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactRequest } from 'src/contact-requests/contact-request.entity';
import { DownloadRequest } from 'src/download-requests/entities/download-request.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService, private configService: ConfigService) { }

    async sendDownloadLink(downloadRequest: DownloadRequest) {
        const url = `${this.configService.get('APP_URL')}/download-request/${downloadRequest.hash}`;

        await this.mailerService.sendMail({
            to: downloadRequest.user.email,
            from: `Dicoogle Downloader <${process.env.MAIL_USER}>`,
            subject: `Dicoogle ${downloadRequest.resource} download link`,
            template: 'download.template.hbs',
            context: {
                subject: `Dicoogle ${downloadRequest.resource} download link`,
                username: downloadRequest.user.name,
                resource: downloadRequest.resource,
                download_link: url,
            },
        });
    }

    async forwardContact(contact: ContactRequest) {
        await this.mailerService.sendMail({
            to: this.configService.get('ADMIN_EMAILS').split(' '),
            subject: `[Contact] ${contact.subject}`,
            template: 'contact.template.hbs',
            replyTo: contact.email,
            context: { ...contact },
            attachments: []
        });
    }
}
