import { Test, TestingModule } from '@nestjs/testing';
import { EncargadoLegalController } from './encargado-legal.controller';
import { EncargadoLegalService } from './encargado-legal.service';

describe('EncargadoLegalController', () => {
  let controller: EncargadoLegalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncargadoLegalController],
      providers: [EncargadoLegalService],
    }).compile();

    controller = module.get<EncargadoLegalController>(EncargadoLegalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
