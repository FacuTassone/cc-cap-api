import { ApiPropertyOptional } from '@nestjs/swagger';

export class InstrumentSearchDto {
  @ApiPropertyOptional({
    description: 'Filtro de búsqueda por ticker o nombre',
    example: 'AAPL',
  })
  query?: string;
}
