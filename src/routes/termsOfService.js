// @flow

import {Router} from 'express';
import axios, {type AxiosResponse, AxiosError} from 'axios';

const router = new Router({});

router.get('/', (req, res) => {
  res.status(200);
  axios.get(process.env.TERMS_OF_SERVICE)
    .then((response: AxiosResponse) => {
      const {data} = response;
      res.send(data);
    })
    .catch((error: AxiosError) => {
      return console.error(error);
    });
});

export default router;
