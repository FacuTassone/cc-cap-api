import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from '../../application/portfolio/portfolio.service';
import { GetPortfolioUseCase } from '../../application/portfolio/portfolio.usecase';
import { DatabaseModule } from '../../infrastructure/database/database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [PortfolioController],
  providers: [PortfolioService, GetPortfolioUseCase],
  exports: [GetPortfolioUseCase],
})
export class PortfolioModule {}
