import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './middlewares/auth';
import db from './database';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import PlaceController from './app/controllers/PlaceController';
import LikeController from './app/controllers/LikeController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/browse', (req, res) => {
  db.query(
    `
    SELECT places.id, places.name,
    users.name as user_name,
    images.url as image_url,
    places.likes_count from places
    INNER JOIN images ON places.image_id=images.id
    INNER JOIN users ON places.user_id=users.id
  `,
    (error, results) => {
      if (error) throw error;

      return res.json(results);
    }
  );
});
routes.put('/places/:place_id/like', LikeController.update);

routes.use(authMiddleware);

routes.post('/places', PlaceController.store);
routes.get('/places', PlaceController.index);
routes.get('/places/:place_id', PlaceController.show);
routes.put('/places/:place_id', PlaceController.update);
routes.delete('/places/:place_id', PlaceController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
