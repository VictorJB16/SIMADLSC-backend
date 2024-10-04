import { Test, TestingModule } from '@nestjs/testing';
import { DetallesMatriculaService } from './detalles_matricula.service';

describe('DetallesMatriculaService', () => {
  let service: DetallesMatriculaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallesMatriculaService],
    }).compile();

    service = module.get<DetallesMatriculaService>(DetallesMatriculaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
