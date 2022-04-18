import {
  EVENT_READY,
  EVENT_PAYMENT_CREATE,
  EVENT_PAYMENT_SUCCESS,
  EVENT_PAYMENT_ERROR,
} from "./constants";
import { isFunction, addListener, removeListener } from "./utilities";

export default {
  bind() {
    const { element, options } = this;

    if (isFunction(options.onReady)) {
      addListener(element, EVENT_READY, options.onReady);
    }

    if (isFunction(options.onCreate)) {
      addListener(element, EVENT_PAYMENT_CREATE, options.onCreate);
    }

    if (isFunction(options.onSuccess)) {
      addListener(element, EVENT_PAYMENT_SUCCESS, options.onSuccess);
    }

    if (isFunction(options.onError)) {
      addListener(element, EVENT_PAYMENT_ERROR, options.onError);
    }
  },

  unbind() {
    const { element, options } = this;

    if (isFunction(options.onReady)) {
      removeListener(element, EVENT_READY, options.onReady);
    }

    if (isFunction(options.onCreate)) {
      removeListener(element, EVENT_PAYMENT_CREATE, options.onCreate);
    }

    if (isFunction(options.onSuccess)) {
      removeListener(element, EVENT_PAYMENT_SUCCESS, options.onSuccess);
    }

    if (isFunction(options.onError)) {
      removeListener(element, EVENT_PAYMENT_ERROR, options.onError);
    }
  },
};
