// @flow

import {Router} from 'express';
import axios, {type AxiosResponse, AxiosError} from 'axios';

const router = new Router({});

router.get('/', (req, res) => {
  res.status(200);
  axios.get(process.env.PRIVACY_POLICY_URL)
    .then((response: AxiosResponse) => {
      const {data} = response;
      res.send(data);
    })
    .catch((error: AxiosError) => {
      return console.error(error);
    });
});

export default router;
