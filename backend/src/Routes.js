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
    this.createUser();
    this.upgradeUser();
    this.deleteUser();

    this.createRecipient();
    this.listRecipients();
    this.updateRecipient();
    this.deleteRecipient();

    this.uploadFile();

    this.listDeliveryMan();
    this.createDeliveryMan();
    this.updateDeliveryMan();
    this.deleteDeliveryMan();

    this.listOrders();
    this.createOrder();
    this.updateOrder();
    this.deleteOrder();
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

  createUser() {
    return this.route.post('/users', UserController.store);
  }

  upgradeUser() {
    return this.route.put('/users/:id', UserController.upgrade);
  }

  deleteUser() {
    return this.route.delete('/users/:id/delete', UserController.delete);
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

  deleteRecipient() {
    return this.route.delete(
      '/recipients/:id/delete',
      RecipientController.delete
    );
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
  listOrders() {
    return this.route.get('/orders', OrderController.index);
  }

  createOrder() {
    return this.route.post('/orders', OrderController.store);
  }

  updateOrder() {
    return this.route.put('/orders/:id/update', OrderController.update);
  }

  deleteOrder() {
    return this.route.delete('/orders/:id/delete', OrderController.delete);
  }
}

export default new Route().route;
