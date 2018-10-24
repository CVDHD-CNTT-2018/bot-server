// @flow

import fs from 'fs';
import http from 'http';
import https from 'https';

import app, {port} from './app';
import './dotenv';

if (process.env.APP_SERVER === 'heroku') {
  app.listen(port, (error: Error) => {
    if (error) {
      return console.error(error);
    }
    console.log('Web server is running on port %d', port);
  });
} else {
  // If the server is not heroku
  const credentials = {
    key: fs.readFileSync(`${__dirname}/../.ssl/key`),
    cert: fs.readFileSync(`${__dirname}/../.ssl/cert`)
  };
  // Start server
  try {
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);
    httpServer.listen(process.env.HTTP_PORT);
    console.log('HTTP web server is running on port %d', process.env.HTTP_PORT);
    httpsServer.listen(process.env.HTTPS_PORT);
    console.log('HTTPS web server is running on port %d', process.env.HTTPS_PORT);
  } catch (error) {
    console.error(error);
  }
}
