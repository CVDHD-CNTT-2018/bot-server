// @flow

import {Router} from 'express';
import path from 'path';

const router = new Router({});

router.get('/', (req, res) => {
  res.status(200);
  const indexPath: string = path.resolve('public/index.html');
  res.sendFile(indexPath);
});

export default router;
