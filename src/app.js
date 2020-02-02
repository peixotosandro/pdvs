import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import database from './config/database';

dotenv.config({
  path: '.env',
});

class App {
  constructor() {
    this.server = express();

    database.connect();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(json());
  }

  routes() {
    this.server.use('/v1', routes);
  }
}

export default new App().server;
