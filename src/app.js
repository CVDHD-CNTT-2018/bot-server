// @flow

import express from 'express';
import bodyParser from 'body-parser';
import webhook from './webhook/router';
import './dotenv';

const app = express();

export const port = process.env.PORT || 8443;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/static/bootstrap', express.static(`${__dirname}/../node_modules/bootstrap/dist/`));
app.use('/static/jquery', express.static(`${__dirname}/../node_modules/jquery/dist/`));
app.use('/static/popper.js', express.static(`${__dirname}/../node_modules/popper.js/dist/`));
app.use('/webhook', webhook);
app.use('', express.static(`${__dirname}/../public`));

export default app;
