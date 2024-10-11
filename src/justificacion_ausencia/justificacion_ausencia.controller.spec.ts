import { Test, TestingModule } from '@nestjs/testing';
import { JustificacionAusenciaController } from './justificacion_ausencia.controller';
import { JustificacionAusenciaService } from './justificacion_ausencia.service';

describe('JustificacionAusenciaController', () => {
  let controller: JustificacionAusenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JustificacionAusenciaController],
      providers: [JustificacionAusenciaService],
    }).compile();

    controller = module.get<JustificacionAusenciaController>(JustificacionAusenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
