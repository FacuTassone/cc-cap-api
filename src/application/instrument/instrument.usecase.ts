import { Injectable } from '@nestjs/common';
import { InstrumentRepository } from '../../infrastructure/repositories/instrument.repository';

@Injectable()
export class SearchInstrumentsUseCase {
  constructor(private readonly instrumentRepository: InstrumentRepository) {}

  async execute(query?: string): Promise<any[]> {
    return this.instrumentRepository.searchInstruments(query);
  }
}
