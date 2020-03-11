import express, { json } from 'express';

import './database/connectionDB';

import routes from './routes';

class Server {
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();

    this.upServer();
  }

  upServer() {
    this.server.listen(3333);
  }

  middleware() {
    this.server.use(json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new Server().server;
