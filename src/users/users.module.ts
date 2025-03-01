import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';  // Asegúrate de importar PrismaModule

@Module({
  imports: [PrismaModule],  // Importa PrismaModule para tener acceso a PrismaService
  providers: [UsersService],  // Ya no es necesario agregar PrismaService directamente aquí
  controllers: [UsersController],
  exports: [UsersService],  // Exporta el servicio para que otros módulos puedan usarlo
})
export class UsersModule {}
