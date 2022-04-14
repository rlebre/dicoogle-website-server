import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { NewContactDto } from './contact-request.dto';
import { ContactRequest } from './contact-request.entity';

@Injectable()
export class ContactRequestsService {

    constructor(private mailService: MailService, @InjectRepository(ContactRequest) private readonly contactRequestRepository: Repository<ContactRequest>) { }

    async sendEmail(newContact: NewContactDto) {
        const newContactRequest = this.contactRequestRepository.create(newContact);
        await this.mailService.forwardContact(newContactRequest);
        return this.contactRequestRepository.save(newContactRequest);
    }
}
