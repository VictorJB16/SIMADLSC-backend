import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsistenciaModule } from './asistencia/asistencia.module';


@Module({
  imports: [ AsistenciaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
