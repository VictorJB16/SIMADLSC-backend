import { Controller, Get } from '@nestjs/common';

@Controller('info') // Esto define la ruta base como `/info`
export class InfoController {
  
  @Get()
  getInfo() {
    return {
      totalEstudiantes: 1000,
      hombres: 480,
      mujeres: 520,
      estadisticasAdicionales: {
        becados: { hombres: 45, mujeres: 55 },
        actividadesExtracurriculares: { hombres: 200, mujeres: 250 },
        transporteEscolar: { hombres: 150, mujeres: 180 },
      },
      promedioNotas: 8.5,
      tasaAsistencia: 95,
    };
  }
}
