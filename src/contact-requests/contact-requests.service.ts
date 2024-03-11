import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { ContactRequest } from './contact-request.entity';
import { NewContactDto } from './dtos/contact-request.dto';

@Injectable()
export class ContactRequestsService {
  constructor(
    private mailService: MailService,
    @InjectRepository(ContactRequest)
    private readonly contactRequestRepository: Repository<ContactRequest>
  ) {}

  async sendEmail(newContact: NewContactDto) {
    const newContactRequest = this.contactRequestRepository.create(newContact);
    await this.mailService.forwardContact(newContactRequest);
    return this.contactRequestRepository.save(newContactRequest);
  }
}
