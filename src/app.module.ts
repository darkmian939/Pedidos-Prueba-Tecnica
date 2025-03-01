import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';  // Importa el AuthModule

@Module({
  imports: [OrdersModule, PrismaModule, UsersModule, AuthModule],  // Agrega AuthModule aquí
})
export class AppModule {}
