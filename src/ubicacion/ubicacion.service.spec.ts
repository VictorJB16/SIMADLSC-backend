import { Test, TestingModule } from '@nestjs/testing';
<<<<<<<< HEAD:src/asistencias/asistencias.service.spec.ts
import { AsistenciasService } from './asistencias.service';

describe('AsistenciasService', () => {
  let service: AsistenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsistenciasService],
    }).compile();

    service = module.get<AsistenciasService>(AsistenciasService);
========
import { UbicacionService } from './ubicacion.service';

describe('UbicacionService', () => {
  let service: UbicacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UbicacionService],
    }).compile();

    service = module.get<UbicacionService>(UbicacionService);
>>>>>>>> Ge_Cambios:src/ubicacion/ubicacion.service.spec.ts
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
