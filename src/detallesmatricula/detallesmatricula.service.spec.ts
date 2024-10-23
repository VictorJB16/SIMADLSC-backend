import { Test, TestingModule } from '@nestjs/testing';
import { DetallesmatriculaService } from './detallesmatricula.service';

describe('DetallesmatriculaService', () => {
  let service: DetallesmatriculaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallesmatriculaService],
    }).compile();

    service = module.get<DetallesmatriculaService>(DetallesmatriculaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
