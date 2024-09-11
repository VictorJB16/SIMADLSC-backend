import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AsistenciaModule } from './asistencia/asistencia.module';

@Module({
  imports: [AuthModule, AsistenciaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
