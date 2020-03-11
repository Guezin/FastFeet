import { Router } from 'express';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';
import RecipientController from './app/controllers/RecipientController';

const route = new Router();

// USER
route.get('/users', UserController.index);

// SIGN IN
route.post('/login', LoginController.store);

// RECIPIENT
route.get('/recipients', RecipientController.index);
route.post('/recipients', RecipientController.store);

export default route;
