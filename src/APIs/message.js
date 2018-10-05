// @flow

import type {AxiosError, AxiosResponse} from 'axios';
import {request} from '../helpers/request';
import '../dotenv';

const {PAGE_ACCESS_TOKEN} = process.env;

class Message {
  send: Function = (message: Object): Promise => {
    return request.post('/v2.6/me/messages', message, {
      params: {
        access_token: PAGE_ACCESS_TOKEN
      }
    })
      .then((response: AxiosResponse) => {
        const {data} = response;
        const {recipient_id, message_id} = data;
        if (messageId) {
          console.log('Message to recipient %s with id %s was sent', recipient_id, message_id);
        } else {
          console.log('Message to recipient %s was sent', recipient_id);
        }
      })
      .catch((error: AxiosError) => {
        console.log('Message sending failed with error: %s', error.message);
        console.error(error);
      });
  };

  receive: Function = (event: Object) => {
    const {sender, message} = event;
    const {mid, app_id, metadata} = message;
    if (message.is_echo) {
      console.log("Received echo for message %s and app %d with metadata %s", mid, app_id, metadata);
    }
    if (message.text) {
      this.send({
        recipient: sender,
        message: {
          text: `Nhận được tin nhắn: ${message.text}`,
          metadata: "TEXT_MESSAGE"
        }
      });
    }
  };
}

export default new Message();
