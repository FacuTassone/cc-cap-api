import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from '../../application/order/order.service';
import { CreateOrderUseCase } from '../../application/order/order.usecase';
import { OrderRepository } from '../../infrastructure/repositories/order.repository';
import { InstrumentRepository } from '../../infrastructure/repositories/instrument.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    CreateOrderUseCase,
    OrderRepository,
    InstrumentRepository,
  ],
  exports: [OrderRepository, InstrumentRepository],
})
export class OrderModule {}
