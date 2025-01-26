import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { PortfolioModule } from './api/portfolio/portfolio.module';
import { InstrumentModule } from './api/instrument/instrument.module';
import { OrderModule } from './api/order/order.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PortfolioModule,
    InstrumentModule,
    OrderModule,
    DatabaseModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
