import { Test, TestingModule } from '@nestjs/testing';
import { TipoEventoService } from './tipo-evento.service';

describe('TipoEventoService', () => {
  let service: TipoEventoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoEventoService],
    }).compile();

    service = module.get<TipoEventoService>(TipoEventoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
