import { Router } from 'express';

import multer from 'multer';
import configMulter from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliveryManController from './app/controllers/DeliveryManController';
import OrderController from './app/controllers/OrderController';

class Route {
  constructor() {
    this.route = new Router();
    this.upload = multer(configMulter);

    this.login();

    this.middleware();

    this.listUsers();

    this.createRecipient();
    this.listRecipients();
    this.createRecipient();
    this.updateRecipient();

    this.uploadFile();

    this.listDeliveryMan();
    this.createDeliveryMan();
    this.updateDeliveryMan();
    this.deleteDeliveryMan();

    this.createOrder();
  }

  // SIGN IN
  login() {
    return this.route.post('/login', LoginController.store);
  }

  middleware() {
    return this.route.use(authMiddleware);
  }

  // USER
  listUsers() {
    return this.route.get('/users', UserController.index);
  }

  // RECIPIENT
  listRecipients() {
    return this.route.get('/recipients', RecipientController.index);
  }

  createRecipient() {
    return this.route.post('/recipients', RecipientController.store);
  }

  updateRecipient() {
    return this.route.put('/recipients/:id', RecipientController.update);
  }

  // FILE
  uploadFile() {
    return this.route.post(
      '/files',
      this.upload.single('file'),
      FileController.store
    );
  }

  // DELIVERYMAN
  listDeliveryMan() {
    return this.route.get('/deliveryman', DeliveryManController.index);
  }

  createDeliveryMan() {
    return this.route.post('/deliveryman', DeliveryManController.store);
  }

  updateDeliveryMan() {
    return this.route.put('/deliveryman/:id', DeliveryManController.update);
  }

  deleteDeliveryMan() {
    return this.route.delete('/deliveryman/:id', DeliveryManController.delete);
  }

  // ORDER
  createOrder() {
    return this.route.post('/orders', OrderController.store);
  }
}

export default new Route().route;
