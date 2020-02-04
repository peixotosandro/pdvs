import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app';

/* global describe, it */

describe('Searching PDVs', () => {
  it('should find the nearest PDV in intersecting areas.', async () => {
    const response = await request(app).get(
      '/v1/search?lng=-45.90641498565674&lat=-23.21413469724121'
    );
    expect(response.status).to.equal(200);
    expect(response.body.tradingName).to.equal('Beer Express');
  });

  it('should find the PDV in its area.', async () => {
    const response = await request(app).get(
      '/v1/search?lng=-45.90388298034668&lat=-23.21600812389002'
    );
    expect(response.status).to.equal(200);
    expect(response.body.tradingName).to.equal('Adega da Cerveja - Aquarius');
  });

  it('should NOT find a PDV outside the service area.', async () => {
    const response = await request(app).get(
      '/v1/search?lng=-45.90437650680542&lat=-23.218137882271854'
    );
    expect(response.status).to.equal(404);
  });
});
