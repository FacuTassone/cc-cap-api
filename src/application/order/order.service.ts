import { Injectable } from '@nestjs/common';
import { CreateOrderUseCase } from './order.usecase';
import { CreateOrderDto } from '../../api/order/dtos/create-order.dto';
import { Order } from '../../domain/order.entity';

@Injectable()
export class OrderService {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.createOrderUseCase.execute(createOrderDto);
  }
}
