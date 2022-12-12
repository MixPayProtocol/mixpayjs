import APIClient from './api';

export default function MixPay(apiKey = ''): any {
  return new APIClient(apiKey);
}
