// @flow

import app from './app';
import './dotenv';

const callback: Function = (error: Error) => {
  if (error) {
    return console.error(error);
  }
  console.log('Web server is up and running!');
};

const PORT = process.env.PORT || 8443;

app.listen(PORT, callback);
