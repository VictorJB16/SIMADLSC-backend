import { Test, TestingModule } from '@nestjs/testing';
import { MailerCustomService } from './mailer.service';

describe('MailerCustomService', () => {
  let service: MailerCustomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerCustomService],
    }).compile();

    service = module.get<MailerCustomService>(MailerCustomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
