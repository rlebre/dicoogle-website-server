import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { ContactRequest } from './contact-request.entity';
import { ContactRequestsService } from './contact-requests.service';
import { ContactRequestsController } from './contact-requests.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContactRequest]), MailModule],
  providers: [ContactRequestsService],
  controllers: [ContactRequestsController]
})
export class ContactRequestsModule {}
