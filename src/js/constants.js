export const API_BASE_URL = 'https://api.mixpay.me/v1';

export const NAMESPACE = '--mixpay';
export const LOGO_IMAGE_URL = 'https://mixpay.me/plugins/logo.svg';

export const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export const WINDOW = IS_BROWSER ? window : {};
export const IS_MIXIN = !!((WINDOW.webkit
  && WINDOW.webkit.messageHandlers
  && WINDOW.webkit.messageHandlers.MixinContext)
  || (WINDOW.MixinContext && WINDOW.MixinContext.getContext));

export const EVENT_READY = 'ready';
export const EVENT_PAYMENT_CREATE = 'create';
export const EVENT_PAYMENT_SUCCESS = 'success';
export const EVENT_PAYMENT_ERROR = 'error';
