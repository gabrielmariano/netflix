import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProfileController from './app/controllers/ProfileController';
import AuthController from './app/controllers/AuthController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'CRUD D.S & ADV' }));

routes.get('/usuario/:id', UserController.index);
routes.get('/usuario', UserController.list);
routes.post('/usuario', UserController.store);
routes.put('/usuario/:id', UserController.update);
routes.delete('/usuario/:id', UserController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/auth', AuthController.store);

export default routes;
