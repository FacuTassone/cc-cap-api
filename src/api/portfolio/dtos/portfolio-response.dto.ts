import { ApiProperty } from '@nestjs/swagger';

export class PortfolioPositionDto {
  @ApiProperty({
    description: 'Ticker del activo',
    example: 'AAPL',
  })
  ticker: string;

  @ApiProperty({
    description: 'Nombre del activo',
    example: 'Apple Inc.',
  })
  name: string;

  @ApiProperty({
    description: 'Cantidad de acciones del activo',
    example: 10,
  })
  quantity: number;

  @ApiProperty({
    description: 'Precio actual del activo en pesos',
    example: 150.5,
  })
  price: number;

  @ApiProperty({
    description: 'Valor total de la posición en pesos',
    example: 1505,
  })
  totalValue: number;

  @ApiProperty({
    description: 'Rendimiento del activo en porcentaje',
    example: 2.5,
  })
  performance: number;
}
  
export class PortfolioResponseDto {
  @ApiProperty({ description: 'Cantidad total de efectivo disponible', example: 1000 })
  cash: number;
  
  @ApiProperty({ description: 'Valor total del portafolio', example: 2500 })
  totalPortfolioValue: number;
  
  @ApiProperty({ type: [PortfolioPositionDto] })
  positions: PortfolioPositionDto[];
    
}
  