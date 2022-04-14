import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NewContactDto } from './contact-request.dto';
import { ContactRequestsService } from './contact-requests.service';

@Controller()
export class ContactRequestsController {
    constructor(private readonly contactRequestService: ContactRequestsService) { }

    @Post('sendEmail')
    async sendEmail(@Body() newContact: NewContactDto) {
        const contact = plainToClass(NewContactDto, newContact);
        const errors = await validate(contact)
        if (errors.length > 0) {
            throw new BadRequestException(errors[0].constraints[Object.keys(errors[0].constraints)[0]]);
        }

        return this.contactRequestService.sendEmail(newContact);
    }
}
