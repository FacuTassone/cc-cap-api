import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { DataSource } from 'typeorm';
import { Order } from '../../../domain/order.entity';
import { IsPositive } from 'class-validator';

describe('Orders API (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a BUY order and update user cash and positions', async () => {
    const userId = 1;
    const instrumentId = 26;
    const payload = {
      userId,
      instrumentId,
      size: 1,
      type: 'MARKET',
      side: 'BUY',
    };

    const response = await request(app.getHttpServer())
      .post('/orders')
      .send(payload)
      .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(Number),
        size: 1,
        price: expect.any(String),
        type: "MARKET",
        side: "BUY",
        status: "FILLED",
        datetime: expect.any(String),
        instrument: {
          id: instrumentId,
        },
        user: {
          id: userId,
        },
      });

    const orderRepo = dataSource.getRepository(Order);
    const createdOrder = await orderRepo.findOne({ where: { id: response.body.id } });

    expect(createdOrder).not.toBeNull();
    expect(createdOrder.size).toBe("1.00");
    expect(createdOrder.status).toBe('FILLED');
  });

  it('should create a BUY order with status REJECTED if user cash is insufficient', async () => {
    const userId = 1;
    const instrumentId = 50;
    const payload = {
      userId,
      instrumentId,
      size: 1000,
      type: 'MARKET',
      side: 'BUY',
    };
  
    const response = await request(app.getHttpServer())
      .post('/orders')
      .send(payload)
      .expect(201);
  
    expect(response.body).toMatchObject({
      size: payload.size,
      price: expect.any(String),
      type: payload.type,
      side: payload.side,
      status: 'REJECTED',
      datetime: expect.any(String),
      instrument: { id: instrumentId },
      user: { id: userId },
      id: expect.any(Number),
    });
  });
  

  it('should create a SELL order and update user positions and cash', async () => {
    const userId = 1;
    const instrumentId = 54;
    const sellSize = 10;

    const response = await request(app.getHttpServer())
      .post('/orders')
      .send({
        userId,
        instrumentId,
        size: sellSize,
        type: 'MARKET',
        side: 'SELL',
      })
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(Number),
      user: { id: userId },
      instrument: { id: instrumentId },
      size: sellSize,
      type: 'MARKET',
      side: 'SELL',
      status: 'FILLED',
      price: expect.any(String),
    });

  });


});
