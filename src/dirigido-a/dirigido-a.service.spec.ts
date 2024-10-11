import { Test, TestingModule } from '@nestjs/testing';
import { DirigidoAService } from './dirigido-a.service';

describe('DirigidoAService', () => {
  let service: DirigidoAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirigidoAService],
    }).compile();

    service = module.get<DirigidoAService>(DirigidoAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
