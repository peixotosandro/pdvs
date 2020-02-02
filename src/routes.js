import { Router } from 'express';
import PdvController from './app/controllers/PdvController';

const routes = new Router();

routes.post('/pdvs', PdvController.store);

export default routes;
