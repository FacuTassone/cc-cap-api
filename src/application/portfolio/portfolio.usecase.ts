import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../infrastructure/repositories/order.repository';
import { InstrumentRepository } from '../../infrastructure/repositories/instrument.repository';

@Injectable()
export class GetPortfolioUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly instrumentRepository: InstrumentRepository,
  ) {}

  async execute(userId: number): Promise<any> {
    const cash = await this.orderRepository.getCashAvailable(userId);
    const positions = await this.instrumentRepository.getUserPositions(userId);
    const totalPortfolioValue = positions.reduce((acc, pos) => acc + parseFloat(pos.totalValue || '0'), 0);

    return {
      cash,
      totalPortfolioValue,
      positions,
    };
  }
}
