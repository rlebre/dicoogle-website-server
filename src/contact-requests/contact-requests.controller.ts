import { Body, Controller, Post } from '@nestjs/common';
import { ContactRequestsService } from './contact-requests.service';
import { NewContactDto } from './dtos/contact-request.dto';

@Controller('contact')
export class ContactRequestsController {
    constructor(private readonly contactRequestService: ContactRequestsService) { }

    @Post('send')
    async sendEmail(@Body() newContact: NewContactDto) {
        return this.contactRequestService.sendEmail(newContact);
    }
}
