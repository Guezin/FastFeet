import { Router } from 'express';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';

const route = new Router();

// USER
route.get('/users', UserController.index);

// SIGN IN
route.post('/login', LoginController.store);

export default route;
