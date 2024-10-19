import { Test, TestingModule } from '@nestjs/testing';
import { EncargadoLegalService } from './encargado-legal.service';

describe('EncargadoLegalService', () => {
  let service: EncargadoLegalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncargadoLegalService],
    }).compile();

    service = module.get<EncargadoLegalService>(EncargadoLegalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
