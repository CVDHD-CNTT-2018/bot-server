// @flow

import {Router} from 'express';
import moment from 'moment';
import '../dotenv';
import messageAPI from '../APIs/message';
import type {EntryType, EventType} from "../types/webhook";

const webhook = Router({});

webhook.get('/', (req, res) => {
  const {query} = req;
  const {APP_VERIFY_TOKEN} = process.env;
  if (query.hasOwnProperty('hub.mode') && query.hasOwnProperty('hub.verify_token')) {
    if (query['hub.mode'] === 'subscribe') {
      if (query['hub.verify_token'] === APP_VERIFY_TOKEN) {
        if (query['hub.challenge']) {
          res.send(query['hub.challenge']);
          return 0;
        } else {
          res.send('WEBHOOK_VERIFIED');
        }
      }
    }
  }
});

webhook.post('/', (req, res) => {
  const {body} = req;
  if (body.object === 'page') {
    body.entry.map((pageEntry: EntryType) => {
      pageEntry.messaging.map((messageEvent) => {
        if (messageEvent.message) {
          messageAPI.receive(messageEvent);
        }
      });
    });
  }
});

export default webhook;
