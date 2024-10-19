import { Test, TestingModule } from '@nestjs/testing';
import { DetallesmatriculaController } from './detallesmatricula.controller';

describe('DetallesmatriculaController', () => {
  let controller: DetallesmatriculaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallesmatriculaController],
    }).compile();

    controller = module.get<DetallesmatriculaController>(DetallesmatriculaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
