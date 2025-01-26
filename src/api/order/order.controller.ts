import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { OrderService } from '../../application/order/order.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from '../../domain/order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBody({ type: CreateOrderDto })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }
}
