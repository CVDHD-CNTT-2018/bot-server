// @flow

import express from 'express';
import bodyParser from 'body-parser';
import webhook from './webhook/router';
import defaultRoute from './routes/default';
import privacyPolicy from './routes/privacyPolicy';
import termsOfService from './routes/termsOfService';
import './dotenv';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// URL-Log middleware
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// Static routes
app.use('/static/bootstrap', express.static(`${__dirname}/../node_modules/bootstrap/dist/`));
app.use('/static/jquery', express.static(`${__dirname}/../node_modules/jquery/dist/`));
app.use('/static/popper.js', express.static(`${__dirname}/../node_modules/popper.js/dist/`));
app.use('', express.static(`${__dirname}/../public`));

// Webhook route
app.use('/webhook', webhook);

// Main route
app.use('/', defaultRoute);
app.use('/privacy-policy', privacyPolicy);
app.use('/terms-of-service', termsOfService);

export default app;
