import { DEFAULT, PAYMENT_DEFAULT } from './default';
import TEMPLATE from './template';
import { EVENT_READY, NAMESPACE } from './constants';
import {
  assign,
  isPlainObject,
  dispatchEvent,
  addListener,
  isArray,
  copyTemplate,
} from './utilities';

import APIS from './apis';

class MixPay {
  constructor(options = {}) {
    this.options = assign({}, DEFAULT, isPlainObject(options) && options);
    this.ready = false;

    this.quoteAssets = [];
    this.paymentAssets = [];

    this.element = null;

    this.payConfig = null;
    this.payInfo = null;

    this.init();
  }

  init() {
    const { options } = this;
    const element = document.createElement('div');
    element.setAttribute('class', NAMESPACE);
    element.style.display = 'none';
    if (options.hasMask) {
      const mask = document.createElement('div');
      mask.setAttribute('class', `${NAMESPACE}-mask`);
      element.appendChild(element);
    }
    const container = document.createElement('div');
    container.setAttribute('class', `${NAMESPACE}-container`);
    container.innerHTML = TEMPLATE;

    this.element = element;
    this.bind();
    this.load();
  }

  load() {
    const { element } = this;
    const promises = [];
    if (!this.quoteAssets.length) {
      promises.push(
        MixPay.getQuoteAssets().then((data) => {
          this.quoteAssets = isArray(data.data) ? data.data : [];
        }),
      );
    }
    if (!this.paymentAssets.length) {
      promises.push(
        MixPay.getPaymentAssets().then((data) => {
          this.paymentAssets = isArray(data.data) ? data.data : [];
        }),
      );
    }

    Promise.all(promises)
      .then(() => {
        this.ready = true;
        dispatchEvent(element, EVENT_READY);
      })
      .catch(() => {
        setTimeout(this.load, 1000);
      });
  }

  destroy() {
    if (!this.ready) return;
    this.ready = false;
    const { element } = this;
    const parentNode = element && element.parentNode;
    if (parentNode) {
      parentNode.removeChild(element);
    }
  }

  pay(element = null, options = {}) {
    this.payConfig = copyTemplate(
      copyTemplate(PAYMENT_DEFAULT, this.options),
      isPlainObject(options) && options,
    );
    if (!this.ready) {
      addListener(element, () => { }, { once: true });
    }
  }

  static setDefaults(options) {
    assign(DEFAULT, isPlainObject(options) && options);
  }
}

assign(MixPay, APIS);

export default MixPay;
