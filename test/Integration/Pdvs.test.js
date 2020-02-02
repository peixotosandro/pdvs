import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app';

/* global describe, it */

describe('PDV create', () => {
  process.env.NODE_ENV = 'test';
  it('should register the new PDV.', async () => {
    const response = await request(app)
      .post('/v1/pdvs')
      .send({
        tradingName: 'Adega da Cerveja - Pinheiros',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0001',
      });

    expect(response.status).to.equal(200);
  });
});
