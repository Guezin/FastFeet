import express, { json } from 'express';

import './database/connectionDB';

import Routes from './Routes';

class Server {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();

    this.upServer();
  }

  upServer() {
    this.server.listen(3333);
  }

  middlewares() {
    this.server.use(json());
  }

  routes() {
    this.server.use(Routes);
  }
}

export default new Server().server;
