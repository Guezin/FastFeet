import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';
import RecipientController from './app/controllers/RecipientController';

class Route {
  constructor() {
    this.route = new Router();

    this.login();

    this.middleware();
    this.getUsers();
    this.createRecipient();
    this.getRecipients();
    this.createRecipient();
  }

  // SIGN IN
  login() {
    return this.route.post('/login', LoginController.store);
  }

  middleware() {
    return this.route.use(authMiddleware);
  }

  // USER
  getUsers() {
    return this.route.get('/users', UserController.index);
  }

  // RECIPIENT
  getRecipients() {
    return this.route.get('/recipients', RecipientController.index);
  }

  createRecipient() {
    return this.route.post('/recipients', RecipientController.store);
  }
}

export default new Route().route;
