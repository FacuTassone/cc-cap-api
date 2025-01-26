import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Instrument } from './instrument.entity';
  
  @Entity('marketdata')
  export class MarketData {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Instrument, { eager: true })
    @JoinColumn({ name: 'instrumentid' })
    instrument: Instrument;
  
    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    high: number;
  
    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    low: number;
  
    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    open: number;
  
    @Column({ type: 'numeric', precision: 10, scale: 2 })
    close: number;
  
    @Column({ type: 'numeric', precision: 10, scale: 2 })
    previousclose: number;
  
    @Column({ type: 'date' })
    date: Date;
  }
  