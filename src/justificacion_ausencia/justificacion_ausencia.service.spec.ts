import { Test, TestingModule } from '@nestjs/testing';
import { JustificacionAusenciaService } from './justificacion_ausencia.service';

describe('JustificacionAusenciaService', () => {
  let service: JustificacionAusenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JustificacionAusenciaService],
    }).compile();

    service = module.get<JustificacionAusenciaService>(JustificacionAusenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
