import { Test, TestingModule } from '@nestjs/testing';
import { ContactRequestsService } from './contact-requests.service';

describe('ContactRequestsService', () => {
  let service: ContactRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactRequestsService]
    }).compile();

    service = module.get<ContactRequestsService>(ContactRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
