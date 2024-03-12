import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { ContactRequest } from './contact-request.entity';
import { ContactRequestsController } from './contact-requests.controller';
import { ContactRequestsService } from './contact-requests.service';

describe('ContactRequestsController', () => {
  let controller: ContactRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactRequestsController],
      providers: [
        ContactRequestsService,
        {
          provide: MailService,
          useValue: {
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

    controller = module.get<ContactRequestsController>(ContactRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
