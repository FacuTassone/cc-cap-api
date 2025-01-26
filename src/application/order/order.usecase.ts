import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderRepository } from '../../infrastructure/repositories/order.repository';
import { InstrumentRepository } from '../../infrastructure/repositories/instrument.repository';
import { CreateOrderDto } from '../../api/order/dtos/create-order.dto';
import { Order } from '../../domain/order.entity';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly instrumentRepository: InstrumentRepository,
  ) {}

  async execute(createOrderDto: CreateOrderDto): Promise<Order> {
    const { instrumentId, userId, size, totalAmount, price, type, side } = createOrderDto;

    let moneda = await this.instrumentRepository.getInstrument('MONEDA');

    if (!size && !totalAmount) {
      throw new BadRequestException('Debes proporcionar `size` o `totalAmount`.');
    }

    if (size && totalAmount) {
      throw new BadRequestException('No puedes proporcionar `size` y `totalAmount` simultáneamente.');
    }

    if ((side === 'CASH_IN' || side === 'CASH_OUT') && moneda.id !== instrumentId) {
      throw new BadRequestException('Solo puedes realizar operaciones de ingreso o egreso de dinero con la moneda.');
    }
  
    const latestPrice = await this.instrumentRepository.getLatestPrice(instrumentId);
    let finalSize = size;
  
    if (totalAmount) {
      finalSize = Math.floor(totalAmount / latestPrice);
      if (finalSize <= 0) {
        throw new BadRequestException(`El monto total (${totalAmount}) no permite comprar al menos una acción.`);
      }
    }
  
    let isRejected = false;
    if (side === 'BUY') {
      isRejected = await this.isFundsInsufficient(userId, finalSize, latestPrice);
    } else if (side === 'SELL') {
      isRejected = await this.isSharesInsufficient(userId, instrumentId, finalSize);
    }

    const order = this.orderRepository.create({
      instrument: { id: instrumentId } as any,
      user: { id: userId } as any,
      size: finalSize,
      price: type === 'MARKET' ? latestPrice : price!,
      type,
      side,
      status: isRejected ? 'REJECTED' : type === 'MARKET' ? 'FILLED' : 'NEW',
      datetime: new Date(),
    });
  
    const savedOrder = await this.orderRepository.save(order);

    if (!isRejected) {
      if (side === 'BUY') {
        const cashOutOrder = this.orderRepository.create({
          instrument: { id: moneda.id },
          user: { id: userId },
          size: finalSize * latestPrice,
          price: 1,
          type: 'MARKET',
          side: 'CASH_OUT',
          status: 'FILLED',
          datetime: new Date(),
        });
  
        await this.orderRepository.save(cashOutOrder);
      }
  
      if (side === 'SELL') {
        const cashInOrder = this.orderRepository.create({
          instrument: { id: moneda.id },
          user: { id: userId },
          size: finalSize * latestPrice,
          price: 1,
          type: 'MARKET',
          side: 'CASH_IN',
          status: 'FILLED',
          datetime: new Date(),
        });
  
        await this.orderRepository.save(cashInOrder);
      }
    }
    return savedOrder;
  }
  

  private async isFundsInsufficient(userId: number, size: number, price: number): Promise<boolean> {
    const cashAvailable = await this.orderRepository.getCashAvailable(userId);
    const totalCost = size * price;

    return totalCost > cashAvailable;
  }

  private async isSharesInsufficient(userId: number, instrumentId: number, size: number): Promise<boolean> {
    const sharesOwned = await this.orderRepository.getSharesOwned(userId, instrumentId);

    return size > sharesOwned;
  }
}
