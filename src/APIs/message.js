// @flow

import type {AxiosError, AxiosResponse} from 'axios';
import '../dotenv';
import {request} from '../helpers/request';

const {PAGE_ACCESS_TOKEN} = process.env;

class Message {
  send: Function = (message: Object): Promise => {
    return request.post('/me/messages', message, {
      params: {
        access_token: PAGE_ACCESS_TOKEN
      }
    })
      .then((response: AxiosResponse) => {
        const {data} = response;
        const {recipientId, messageId} = data;
        if (messageId) {
          console.log('Message to recipient %s with id %s was sent', recipientId, messageId);
        } else {
          console.log('Message to recipient %s was sent', recipientId);
        }
      })
      .catch((error: AxiosError) => {
        console.log('Message sending failed with error: %s', error.message);
        console.error(error);
      });
  };

  receive: Function = (event: Object) => {
    const {sender, recipient, message} = event;
    const {mid, app_id, metadata} = message;
    if (message.is_echo) {
      console.log("Received echo for message %s and app %d with metadata %s", mid, app_id, metadata);
    }
    if (message.text) {
      this.send({
        recipient,
        message: {
          text: `Nhận được tin nhắn: ${message.text}`,
          metadata: "TEXT_MESSAGE"
        }
      });
    }
  };
}

export default new Message();
