import express, { json } from 'express';
import cors from 'cors';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.pathsFile = null;

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
