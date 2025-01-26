import { SearchInstrumentsUseCase } from './instrument.usecase';
import { InstrumentRepository } from '../../infrastructure/repositories/instrument.repository';

describe('SearchInstrumentsUseCase', () => {
  let useCase: SearchInstrumentsUseCase;
  let mockRepository: Partial<InstrumentRepository>;

  beforeEach(() => {
    mockRepository = {
      searchInstruments: jest.fn().mockResolvedValue([
        { ticker: 'AAPL', name: 'Apple Inc.' },
      ]),
    };
    useCase = new SearchInstrumentsUseCase(mockRepository as InstrumentRepository);
  });

  it('should return instruments matching the query', async () => {
    const result = await useCase.execute('AAPL');
    expect(result).toEqual([{ ticker: 'AAPL', name: 'Apple Inc.' }]);
    expect(mockRepository.searchInstruments).toHaveBeenCalledWith('AAPL');
  });
});
