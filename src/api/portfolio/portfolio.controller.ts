import { Controller, Get, Param } from '@nestjs/common';
import { PortfolioService } from '../../application/portfolio/portfolio.service';
import { PortfolioResponseDto } from './dtos/portfolio-response.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Obtener el portafolio del usuario' })
  @ApiParam({ name: 'userId', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Portafolio del usuario', type: PortfolioResponseDto })
  async getPortfolio(@Param('userId') userId: string): Promise<PortfolioResponseDto> {
    const portfolio = await this.portfolioService.getPortfolio(parseInt(userId, 10));
    return portfolio;
  }
}
