import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrderById(orderId: string) {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
  }

  async createOrder(userId: string, items: { productId: string; quantity: number; price: number }[]) {
    if (!userId) {
      throw new Error('El userId es requerido para crear la orden');
    }

    return this.prisma.order.create({
      data: {
        userId,
        status: 'PENDIENTE',
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
  }


  async listOrders(userId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
  }


  async updateOrderStatus(orderId: string, status: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO'): Promise<Order> {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}
