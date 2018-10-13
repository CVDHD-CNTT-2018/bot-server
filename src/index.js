// @flow

import fs from 'fs';
import http from 'http';
import https from 'https';
import app from './app';
import './dotenv';

const credentials = {
  key: fs.readFileSync(`${__dirname}/../.ssl/key`),
  cert: fs.readFileSync(`${__dirname}/../.ssl/cert`),
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.HTTP_PORT);
httpsServer.listen(process.env.HTTPS_PORT);
