// @flow

import axios, {type AxiosInstance} from 'axios';

import '../dotenv';

export const request: AxiosInstance = axios.create({
  baseURL: 'https://graph.facebook.com',
  withCredentials: true
});

export const callAPI: AxiosInstance = axios.create({
  baseURL: process.env.APP_API_BASE_URL,
  withCredentials: true
});
