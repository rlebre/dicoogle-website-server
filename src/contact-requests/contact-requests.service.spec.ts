import { Test, TestingModule } from '@nestjs/testing';
import { ContactRequestsService } from './contact-requests.service';
import { MailService } from 'src/mail/mail.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ContactRequest } from './contact-request.entity';

describe('ContactRequestsService', () => {
  let service: ContactRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactRequestsService,
        {
          provide: MailService,
          useValue: {
            sendDownloadLink: jest.fn(),
            forwardContact: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(ContactRequest),
          useValue: {
            create: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<ContactRequestsService>(ContactRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
