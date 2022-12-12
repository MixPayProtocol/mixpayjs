import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { delay } from './tools';

const apiHostURL = ['https://api.mixpay.me/v1'];

export const request = (apiKey = ''): AxiosInstance => {
  const instance = axios.create({
    baseURL: apiHostURL[0],
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    timeout: 20000,
  });

  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    return config;
  });

  instance.interceptors.response.use(
    (res: AxiosResponse) => {
      const { data, success, message } = res.data;
      if (!success) {
        return Promise.reject(new Error(message));
      }
      return data;
    },
    async (e: any) => {
      if (['ETIMEDOUT', 'ECONNABORTED'].includes(e.code)) {
        await delay();
        return instance(e.config);
      }
      return Promise.reject(e.response.data);
    }
  );

  return instance;
};
