// @flow

import {Router} from 'express';
import path from 'path';

const router = new Router({});

router.get('/', (req, res) => {
  res.status(200);
  res.sendFile(path.resolve('public/privacy-policy.html'));
});

export default router;
