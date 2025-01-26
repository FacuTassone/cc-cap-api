import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Order } from '../../domain/order.entity';
import { Instrument } from '../../domain/instrument.entity';
import { MarketData } from '../../domain/marketdata.entity';
import { User } from '../../domain/user.entity';
import { OrderRepository } from '../repositories/order.repository';
import { InstrumentRepository } from '../repositories/instrument.repository';

@Module({
  providers: [
    OrderRepository,
    InstrumentRepository,
    {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          synchronize: false,
          ssl: process.env.DB_SSL === 'true',
          entities: [Order, Instrument, MarketData, User],
        });
        return dataSource.initialize();
      },
    },
  ],
  exports: [OrderRepository, InstrumentRepository, DataSource],
})
export class DatabaseModule {}
