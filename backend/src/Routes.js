import { Router } from 'express';

import multer from 'multer';
import configMulter from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';

class Route {
  constructor() {
    this.route = new Router();
    this.upload = multer(configMulter);

    this.login();

    this.middleware();
    this.getUsers();
    this.createRecipient();
    this.getRecipients();
    this.createRecipient();
    this.updateRecipient();
    this.uploadFile();
    this.getFiles();
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

  getFiles() {
    return this.route.get('/files', FileController.index);
  }
}

export default new Route().route;
