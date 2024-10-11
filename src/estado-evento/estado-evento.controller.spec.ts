import { Test, TestingModule } from '@nestjs/testing';
import { EstadoEventoController } from './estado-evento.controller';

describe('EstadoEventoController', () => {
  let controller: EstadoEventoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoEventoController],
    }).compile();

    controller = module.get<EstadoEventoController>(EstadoEventoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
