import { Controller, Get, Post, Patch, Body, Param, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() body: { userId: string; items: any[] }) {
    if (!body.userId) {
      throw new BadRequestException('El userId es obligatorio');
    }
    return this.ordersService.createOrder(body.userId, body.items);
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') orderId: string,
    @Body() body: { status?: string }
  ) {
    if (!body || !body.status) {
      throw new BadRequestException('El campo "status" es requerido');
    }

    const validStatuses = ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'];
    const statusUpper = body.status.toUpperCase();

    if (!validStatuses.includes(statusUpper)) {
      throw new BadRequestException(`El estado "${body.status}" no es válido`);
    }

    return this.ordersService.updateOrderStatus(orderId, statusUpper as 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO');
  }
}
