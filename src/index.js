// @flow

import app, {port} from './app';
import './dotenv';

app.listen(port, (error: Error) => {
  if (error) {
    return console.error(error);
  }
  console.log('Web server is running on port %d', port);
});
