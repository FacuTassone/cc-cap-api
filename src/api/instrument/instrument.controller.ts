import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { InstrumentService } from '../../application/instrument/instrument.service';

@ApiTags('Instruments')
@Controller('instruments')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar activos por ticker o nombre' })
  @ApiQuery({ name: 'query', required: false, description: 'Texto a buscar' })
  @ApiResponse({ status: 200, description: 'Lista de activos encontrados' })
  async searchInstruments(@Query('query') query?: string): Promise<any[]> {
    return this.instrumentService.search(query);
  }
}
