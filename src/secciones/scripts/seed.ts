// scripts/seed.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Grado } from '../../grados/entities/grados-entity';
import { Seccion } from '../../secciones/entities/seccion.entity';
import { Profesor } from '../../profesor/entities/profesor.entity';
import { Usuario } from '../../users/entities/user.entity';
import { Roles } from '../../roles/entities/role.entity';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Materia } from '../../materia/entities/materia.entity';
import { Horario } from '../../horario/entities/horario.entity';
import * as dotenv from 'dotenv';
import { Aula } from 'src/aulas/entities/aula.entity';

dotenv.config(); // Cargar variables de entorno

const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Grado, Seccion,Profesor,Usuario,Roles,Estudiante,Materia,Aula,Horario,],
  synchronize: false,
});

async function bootstrap() {
  try {
    console.log('Conectando a la base de datos...');
    await AppDataSource.initialize();
    console.log('Conexión establecida.');

    const gradoRepository = AppDataSource.getRepository(Grado);
    const seccionRepository = AppDataSource.getRepository(Seccion);

    // Definir los grados y secciones
    const grados = [
      { nivel: '7' },
      { nivel: '8' },
      { nivel: '9' },
      { nivel: '10' },
      { nivel: '11' },
    ];

    const seccionesData = [
      { nivel: '7', numSecciones: 2 },
      { nivel: '8', numSecciones: 3 },
      { nivel: '9', numSecciones: 2 },
      { nivel: '10', numSecciones: 1 },
      { nivel: '11', numSecciones: 2 },
    ];

    // Insertar grados y obtener sus IDs
    const gradoMap = new Map<string, number>(); // Mapear nivel a id_grado
    for (const gradoData of grados) {
      const grado = new Grado();
      grado.nivel = gradoData.nivel;
      const savedGrado = await gradoRepository.save(grado);
      gradoMap.set(gradoData.nivel, savedGrado.id_grado);
    }

    // Insertar secciones
    for (const { nivel, numSecciones } of seccionesData) {
      const gradoId = gradoMap.get(nivel);
      if (gradoId) {
        for (let i = 1; i <= numSecciones; i++) {
          const seccion = new Seccion();
          seccion.nombre_Seccion = `${nivel}-${i}`;
          seccion.gradoId = gradoId;
          await seccionRepository.save(seccion);
        }
      }
    }

    await AppDataSource.destroy();
    console.log('Datos iniciales cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar los datos iniciales', error);
  }
}

bootstrap();
