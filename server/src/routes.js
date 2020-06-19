import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'CRUD D.S & ADV' }));

routes.get('/usuario/:id', UserController.index);
routes.get('/usuario', UserController.list);
routes.post('/usuario', UserController.store);
routes.put('/usuario/:id', UserController.update);
routes.delete('/usuario/:id', UserController.delete);

export default routes;
