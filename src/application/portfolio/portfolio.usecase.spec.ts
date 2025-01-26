import { GetPortfolioUseCase } from './portfolio.usecase';
import { OrderRepository } from '../../infrastructure/repositories/order.repository';
import { InstrumentRepository } from '../../infrastructure/repositories/instrument.repository';

describe('GetPortfolioUseCase', () => {
  let useCase: GetPortfolioUseCase;
  let mockOrderRepo: Partial<OrderRepository>;
  let mockInstrumentRepo: Partial<InstrumentRepository>;

  beforeEach(() => {
    mockOrderRepo = {
      getCashAvailable: jest.fn().mockResolvedValue(1000),
    };
    mockInstrumentRepo = {
      getUserPositions: jest.fn().mockResolvedValue([
        {
          ticker: 'AAPL',
          name: 'Apple Inc.',
          quantity: 10,
          price: 150,
          totalValue: 1500,
          performance: 2.5,
        },
      ]),
    };

    useCase = new GetPortfolioUseCase(mockOrderRepo as OrderRepository, mockInstrumentRepo as InstrumentRepository);
  });

  it('should return the portfolio for a user', async () => {
    const result = await useCase.execute(1);

    expect(result).toEqual({
      cash: 1000,
      totalPortfolioValue: 1500,
      positions: [
        {
          ticker: 'AAPL',
          name: 'Apple Inc.',
          quantity: 10,
          price: 150,
          totalValue: 1500,
          performance: 2.5,
        },
      ],
    });
    expect(mockOrderRepo.getCashAvailable).toHaveBeenCalledWith(1);
    expect(mockInstrumentRepo.getUserPositions).toHaveBeenCalledWith(1);
  });
});
