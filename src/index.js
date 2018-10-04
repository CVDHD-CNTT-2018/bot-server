// @flow

import fs from 'fs';
import http from 'http';
import https from 'https';

import app from './app';
import './dotenv';

const {HTTP_PORT, HTTPS_PORT} = process.env;

const credentials = {
    key: fs.readFileSync(`${__dirname}/../.ssl/key`),
    cert: fs.readFileSync(`${__dirname}/../.ssl/cert`),
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

try {
    httpServer.listen(HTTP_PORT);
    httpsServer.listen(HTTPS_PORT);
    console.log('HTTP server is listening on port %d', HTTP_PORT);
    console.log('HTTPS server is listening on port %d', HTTPS_PORT);
} catch (error) {
    console.error(error);
}
