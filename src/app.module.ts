import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [OrdersModule, PrismaModule, UsersModule, AuthModule],
})
export class AppModule {}
