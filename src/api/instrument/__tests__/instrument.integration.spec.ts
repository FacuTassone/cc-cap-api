import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { INestApplication } from '@nestjs/common';

describe('InstrumentController (Functional)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/instruments (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/instruments?query=DYCA')
      .expect(200);

    expect(response.body).toEqual(expect.arrayContaining([
      {id: 1, name: "Dycasa S.A.", ticker: "DYCA", type: "ACCIONES"},
    ]));
  });

  afterAll(async () => {
    await app.close();
  });
});
