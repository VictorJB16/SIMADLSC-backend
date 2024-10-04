import { Test, TestingModule } from '@nestjs/testing';
import { DetallesMatriculaController } from './detalles_matricula.controller';

describe('DetallesMatriculaController', () => {
  let controller: DetallesMatriculaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallesMatriculaController],
    }).compile();

    controller = module.get<DetallesMatriculaController>(DetallesMatriculaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
