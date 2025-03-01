import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { BadRequestException } from '@nestjs/common';


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
}

export default OrdersController;
