import { Router, request, response } from 'express';

import SignInController from './controllers/SignInController';
import RepositoryController from './controllers/RepositoryController';

const routes = Router();

const signInController = new SignInController();
const repositoryController = new RepositoryController();

routes.get('/auth/:code', signInController.auth);

routes.get('/repositories', repositoryController.listRepositories);
routes.put('/repositories/:id', repositoryController.updateTagsAtRepository);

export default routes;
