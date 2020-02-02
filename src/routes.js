import { Router } from 'express';

const routes = new Router();

routes.get('/', (request, response) => {
  return response.json({ teste: 'teste...' });
});

export default routes;
