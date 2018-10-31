// @flow

import fs from 'fs';
import http from 'http';
import https from 'https';

import app from './app';
import './dotenv';

const {HTTP_PORT, HTTPS_PORT} = process.env;
const callback: Function = (error: Error) => {
  if (error) {
    return console.error(error);
  }
  console.log('Web server is up and running!');
};

const credentials = {
  key: fs.readFileSync(`${__dirname}/../.ssl/key`),
  cert: fs.readFileSync(`${__dirname}/../.ssl/cert`)
};
const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);

switch (process.env.APP_ENV) {
case 'production':
  httpsServer.listen(HTTPS_PORT, callback);
  break;
case 'staging':
case 'development':
  httpServer.listen(HTTP_PORT, callback);
  break;
}
