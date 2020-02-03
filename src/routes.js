import { Router } from 'express';
import PdvController from './app/controllers/PdvController';
import SearchController from './app/controllers/SearchController';

const routes = new Router();

routes.post('/pdvs', PdvController.store);
routes.get('/pdvs/:id', PdvController.show);

routes.get('/search', SearchController.show);

export default routes;
