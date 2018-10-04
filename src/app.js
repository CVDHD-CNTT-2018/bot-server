// @flow

import express from 'express';
import bodyParser from 'body-parser';
import './dotenv';
import webhook from './webhook/router';

const app = express();

export const port = process.env.PORT || 8443;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use('/webhook', webhook);
app.use('', express.static(`${__dirname}/../public`));

export default app;
