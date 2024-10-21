import { Test, TestingModule } from '@nestjs/testing';
import { DirigidoAController } from './dirigido-a.controller';

describe('DirigidoAController', () => {
  let controller: DirigidoAController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirigidoAController],
    }).compile();

    controller = module.get<DirigidoAController>(DirigidoAController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
