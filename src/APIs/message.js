// @flow

import type {AxiosError, AxiosResponse} from 'axios';
import {request, callAPI} from '../helpers/request';
import '../dotenv';
import type {MessageType} from "../types/message";

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
        if (message_id) {
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
    const {sender} = event;
    const message: MessageType = event.message;
    const {mid, app_id, metadata} = message;
    if (message.is_echo) {
      console.log("Received echo for message %s and app %d with metadata %s", mid, app_id, metadata);
    }
    if (message.text) {
      console.log('Receive message %s', message.text);
      callAPI.get(`/message`, {
        params: {
          query: message.text
        }
      })
        .then((response) => {
          const {data} = response;
          this.send({
            recipient: sender,
            message: {
              text: data.data.value,
              metadata: 'RESPONSE_TEXT_MESSAGE'
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
}

export default new Message();
