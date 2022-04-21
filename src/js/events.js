import {
  EVENT_READY,
  EVENT_PAYMENT_CREATE,
  EVENT_PAYMENT_SUCCESS,
  EVENT_PAYMENT_ERROR,
} from './constants';
import { isFunction, addListener, removeListener } from './utilities';

export default {
  bind() {
    const { element, options } = this;
    if (isFunction(options.onReady)) {
      addListener(element, EVENT_READY, options.onReady);
    }

    if (isFunction(options.onPaymentCreate)) {
      addListener(element, EVENT_PAYMENT_CREATE, options.onPaymentCreate);
    }

    if (isFunction(options.onPaymentSuccess)) {
      addListener(element, EVENT_PAYMENT_SUCCESS, options.onPaymentSuccess);
    }

    if (isFunction(options.onPaymentFail)) {
      addListener(element, EVENT_PAYMENT_ERROR, options.onPaymentFail);
    }
  },

  unbind() {
    const { element, options } = this;

    if (isFunction(options.onReady)) {
      removeListener(element, EVENT_READY, options.onReady);
    }

    if (isFunction(options.onPaymentCreate)) {
      removeListener(element, EVENT_PAYMENT_CREATE, options.onPaymentCreate);
    }

    if (isFunction(options.onPaymentSuccess)) {
      removeListener(element, EVENT_PAYMENT_SUCCESS, options.onPaymentSuccess);
    }

    if (isFunction(options.onPaymentFail)) {
      removeListener(element, EVENT_PAYMENT_ERROR, options.onPaymentFail);
    }
  },
};
