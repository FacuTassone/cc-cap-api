import { Module } from '@nestjs/common';
import { InstrumentController } from './instrument.controller';
import { InstrumentService } from '../../application/instrument/instrument.service';
import { SearchInstrumentsUseCase } from '../../application/instrument/instrument.usecase';
import { InstrumentRepository } from '../../infrastructure/repositories/instrument.repository';
import { DatabaseModule } from '../../infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InstrumentController],
  providers: [InstrumentService, SearchInstrumentsUseCase, InstrumentRepository],
})
export class InstrumentModule {}
