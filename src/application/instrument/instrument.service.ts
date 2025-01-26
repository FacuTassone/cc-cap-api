import { Injectable } from '@nestjs/common';
import { SearchInstrumentsUseCase } from './instrument.usecase';

@Injectable()
export class InstrumentService {
  constructor(private readonly searchInstrumentsUseCase: SearchInstrumentsUseCase) {}

  async search(query?: string): Promise<any[]> {
    return this.searchInstrumentsUseCase.execute(query);
  }
}
