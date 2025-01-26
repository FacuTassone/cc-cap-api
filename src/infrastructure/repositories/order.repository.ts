import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../../domain/order.entity';
import { Instrument } from '../../domain/instrument.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private readonly dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async getCashAvailable(userId: number): Promise<number> {
    const result = await this.createQueryBuilder('o')
      .select(
        `SUM(CASE 
            WHEN o.side = 'CASH_IN' THEN o.size 
            WHEN o.side = 'CASH_OUT' THEN -o.size 
            ELSE 0 
          END)`,
        'cash',
      )
      .innerJoin(Instrument, 'instrument', 'o.instrumentid = instrument.id')
      .where('o.userId = :userId', { userId })
      .andWhere('instrument.type = :type', { type: 'MONEDA' })
      .andWhere('o.status = :status', { status: 'FILLED' })
      .getRawOne();
  
    return parseFloat(result.cash || '0');
  }
  

  async getSharesOwned(userId: number, instrumentId: number): Promise<number> {
    const result = await this.createQueryBuilder('o')
      .select(
        'SUM(CASE WHEN o.side = :buy THEN o.size WHEN o.side = :sell THEN -o.size ELSE 0 END)',
        'sharesOwned',
      )
      .where('o.user.id = :userId', { userId })
      .andWhere('o.instrument.id = :instrumentId', { instrumentId })
      .andWhere('o.status = :status', { status: 'FILLED', buy: 'BUY', sell: 'SELL' })
      .getRawOne();

    return Number(result.sharesOwned) || 0;
  }

}
