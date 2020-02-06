import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app';

/* global describe, it */

describe('PDVs', () => {
  it('should register a new PDV.', async () => {
    const response = await request(app)
      .post('/v1/pdvs')
      .send({
        tradingName: 'Adega da Cerveja - Aquarius',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0001',
        coverageArea: [
          [
            [
              [-45.90405464172363, -23.222180385790367],
              [-45.903239250183105, -23.220050691871048],
              [-45.9058141708374, -23.21768432546238],
              [-45.91019153594971, -23.21902527157495],
              [-45.91006278991699, -23.22107610429399],
              [-45.90405464172363, -23.222180385790367],
            ],
          ],
          [
            [
              [-45.9058141708374, -23.217211047149544],
              [-45.90276718139648, -23.217763205018137],
              [-45.90208053588867, -23.214331901283597],
              [-45.906758308410645, -23.21377972923133],
              [-45.9058141708374, -23.217211047149544],
            ],
          ],
        ],
        address: [-45.906543731689446, -23.22107610429399],
      });

    this.id = response.body.id;
    expect(response.status).to.equal(201);
  });

  it('should register another one new PDV.', async () => {
    const response = await request(app)
      .post('/v1/pdvs')
      .send({
        tradingName: 'Beer Express',
        ownerName: 'Zé Oliveira',
        document: '1234567890999/0001',
        coverageArea: [
          [
            [
              [-45.90933322906494, -23.2117682260265],
              [-45.91057777404785, -23.218670316561205],
              [-45.90594291687012, -23.21930134704455],
              [-45.90504169464111, -23.212320406392607],
              [-45.90933322906494, -23.2117682260265],
            ],
          ],
        ],
        address: [-45.909247398376465, -23.215081273989707],
      });

    expect(response.status).to.equal(201);
  });

  it('should NOT register an existing PDV.', async () => {
    const response = await request(app)
      .post('/v1/pdvs')
      .send({
        tradingName: 'Beer Express',
        ownerName: 'Zé Oliveira',
        document: '1234567890999/0001',
        coverageArea: [
          [
            [
              [-45.90933322906494, -23.2117682260265],
              [-45.91057777404785, -23.218670316561205],
              [-45.90594291687012, -23.21930134704455],
              [-45.90504169464111, -23.212320406392607],
              [-45.90933322906494, -23.2117682260265],
            ],
          ],
        ],
        address: [-45.909247398376465, -23.215081273989707],
      });

    expect(response.status).to.equal(400);
  });

  it('should NOT register a PDV with missing or wrong data.', async () => {
    const response = await request(app)
      .post('/v1/pdvs')
      .send({
        tradingName: 'Beer Express',
        ownerName: 'Zé Oliveira',
        document: '1234567890999/0001',
        coverageArea: [
          [
            [
              [-45.90933322906494, -23.2117682260265],
              [-45.91057777404785, -23.218670316561205],
              [-45.90594291687012, -23.21930134704455],
              [-45.90504169464111, -23.212320406392607],
              [-45.90933322906494],
            ],
          ],
        ],
        address: [-45.909247398376465, -23.215081273989707],
      });

    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal('Validation error');
  });

  it('should find the first PDV registered.', async () => {
    const response = await request(app).get(`/v1/pdvs/${this.id}`);
    expect(response.status).to.equal(200);
    expect(response.body.tradingName).to.equal('Adega da Cerveja - Aquarius');
  });

  it('should NOT find a non-existent PDV.', async () => {
    const response = await request(app).get(
      '/v1/pdvs/230a5aa0-48d0-11ea-bb3d-7fb31b7bf6b0'
    );
    expect(response.status).to.equal(404);
  });

  it('should NOT find a PDV though a wrong id.', async () => {
    const response = await request(app).get('/v1/pdvs/333-aa-sss');
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal('Validation error');
  });
});
