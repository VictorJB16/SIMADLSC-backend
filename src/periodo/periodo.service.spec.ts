import { Test, TestingModule } from '@nestjs/testing';
import { EventosService } from './eventos.service';

describe('EventosService', () => {
  let service: EventosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventosService],
    }).compile();

    service = module.get<EventosService>(EventosService);
import { PeriodoService } from './periodo.service';
describe('PeriodoService', () => {
  let service: PeriodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodoService],
    }).compile();

    service = module.get<PeriodoService>(PeriodoService);
>>>>>>>> origin:src/periodo/periodo.service.spec.ts
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
