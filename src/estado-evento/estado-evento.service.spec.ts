import { Test, TestingModule } from '@nestjs/testing';
import { EstadoEventoService } from './estado-evento.service';

describe('EstadoEventoService', () => {
  let service: EstadoEventoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoEventoService],
    }).compile();

    service = module.get<EstadoEventoService>(EstadoEventoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
