import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from './user.entity';
  import { Instrument } from './instrument.entity';
  
  @Entity('orders')
  export class Order {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Instrument, { eager: true })
    @JoinColumn({ name: 'instrumentid' })
    instrument: Instrument;
  
    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'userid' })
    user: User;
  
    @Column({ type: 'numeric', precision: 10, scale: 2})
    size: number;
  
    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
    price: number;
  
    @Column({ length: 10 })
    type: string; // market, limit
  
    @Column({ length: 10 })
    side: string; // buy, sell, cash_in, cash_out
  
    @Column({ length: 20 })
    status: string; // new, filled, rejected, cancelled
  
    @Column({ type: 'timestamp' })
    datetime: Date;
  }
  