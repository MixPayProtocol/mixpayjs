export const API_BASE_URL = 'https://api.mixpay.me/v1';

export const NAMESPACE = '--mixpay';

export const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export const WINDOW = IS_BROWSER ? window : {};

export const EVENT_READY = 'ready';
export const EVENT_PAYMENT_CREATE = 'create';
export const EVENT_PAYMENT_SUCCESS = 'success';
export const EVENT_PAYMENT_ERROR = '';
