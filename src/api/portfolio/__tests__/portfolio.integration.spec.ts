import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../app.module';

describe('Portfolio Integration Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/portfolio/:userId (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/portfolio/1')
      .expect(200);

    expect(response.body).toHaveProperty('cash');
    expect(response.body).toHaveProperty('totalPortfolioValue');
    expect(response.body).toHaveProperty('positions');
  });

  afterAll(async () => {
    await app.close();
  });
});
