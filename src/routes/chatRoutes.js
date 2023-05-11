import { Router } from 'express';

import chatController from '../controller/chatController.js';

const router = new Router();

router
  .get('/get-namespace', chatController.getNamespace)
  .post('/set-namespace', chatController.addNamespace)
  .get('get-rooms/:namespaceId', chatController.getRooms);

export default router;
