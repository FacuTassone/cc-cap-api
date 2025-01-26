import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Instrument } from '../../domain/instrument.entity';

@Injectable()
export class InstrumentRepository extends Repository<Instrument> {
  constructor(private readonly dataSource: DataSource) {
    super(Instrument, dataSource.createEntityManager());
  }

    /**
     * Obtiene las posiciones del usuario basadas en sus órdenes.
     * @param userId ID del usuario.
     */

    async getUserPositions(userId: number): Promise<any[]> {
      return this.createQueryBuilder('instrument')
        .select('instrument.ticker', 'ticker')
        .addSelect('instrument.name', 'name')
        .addSelect(
          `SUM(CASE 
              WHEN o.side = 'BUY' THEN o.size 
              WHEN o.side = 'SELL' THEN -o.size 
              ELSE 0 
            END)`,
          'quantity',
        )
        .addSelect('marketdata.close', 'price')
        .addSelect(
          `SUM(CASE 
              WHEN o.side = 'BUY' THEN o.size 
              WHEN o.side = 'SELL' THEN -o.size 
              ELSE 0 
            END) * marketdata.close`,
          'totalValue',
        )
        .addSelect(
          '((marketdata.close - marketdata.previousclose) / marketdata.previousclose) * 100',
          'performance',
        )
        .innerJoin('orders', 'o', 'o.instrumentid = instrument.id')
        .innerJoin(
          qb =>
            qb
              .subQuery()
              .select('md.instrumentid', 'instrumentid')
              .addSelect('md.close', 'close')
              .addSelect('md.previousclose', 'previousclose')
              .addSelect('md.date', 'date')
              .from('marketdata', 'md')
              .where(qb => {
                const subQuery = qb
                  .subQuery()
                  .select('MAX(md2.date)')
                  .from('marketdata', 'md2')
                  .where('md2.instrumentid = md.instrumentid')
                  .getQuery();
                return `md.date = ${subQuery}`;
              }),
          'marketdata',
          'marketdata.instrumentid = instrument.id',
        )
        .where('o.userid = :userId', { userId })
        .andWhere('o.status = :status', { status: 'FILLED' })
        .andWhere('instrument.type != :type', { type: 'MONEDA' })
        .groupBy('instrument.ticker, instrument.name, marketdata.close, marketdata.previousclose')
        .getRawMany();
    }
    
    

  /**
   * Busca activos por ticker o nombre.
   * @param query Texto a buscar.
   */

  async searchInstruments(query?: string): Promise<Instrument[]> {
    const qb = this.createQueryBuilder('instrument');

    if (query) {
      qb.where('instrument.ticker ILIKE :query OR instrument.name ILIKE :query', { query: `%${query}%` });
    }

    return qb.getMany();
  }

  /**
   * Obtiene el precio más reciente de un activo.
   * @param instrumentId ID del activo.
   */

  async getLatestPrice(instrumentId: number): Promise<number> {
    const result = await this.createQueryBuilder('instrument')
      .innerJoinAndSelect('instrument.marketData', 'marketData')
      .where('instrument.id = :instrumentId', { instrumentId })
      .orderBy('marketData.date', 'DESC')
      .limit(1)
      .getOne();

    return result?.marketData[0]?.close || 0;
  }

  /**
   * Obtiene un activo por su tipo.
   * @param instrumentType type del activo.
   */
  
  async getInstrument(instrumentType: string): Promise<Instrument> {
    return this.findOne({ where: { type: instrumentType } });
  }

}
