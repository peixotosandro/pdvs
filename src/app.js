import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.pathsFile = null;

    this.dbconnection();
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

  dbconnection() {
    mongoose.connect(
      'mongodb+srv://user-pdvs:user-pdvs@cluster0-dljuu.mongodb.net/pdvs?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new App().server;
