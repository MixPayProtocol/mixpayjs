import { DEFAULT, PAYMENT_DEFAULT } from './default';
import { EVENT_PAYMENT_CREATE, EVENT_READY } from './constants';
import events from './events';
import render from './render';

import {
  assign,
  isPlainObject,
  dispatchEvent,
  isArray,
  copyTemplate,
  genUuid,
  addListener,
} from './utilities';

import APIS from './apis';

class MixPay {
  constructor(element = null, options = {}) {
    this.options = assign({}, DEFAULT, isPlainObject(options) && options);
    this.ready = false;

    this.quoteAssets = [];
    this.paymentAssets = [];

    const container = document.createElement('div');
    if (!element || !(element instanceof HTMLElement)) {
      element = document.body;
    }
    element.appendChild(container);
    this.element = container;

    this.payConfig = copyTemplate(PAYMENT_DEFAULT, this.options);

    this.payInfo = {};

    this.paymentInfo = {};

    this.isSubmitting = false;
    this.countdownInterval = null;
    this.pollResultInterval = null;

    this.init();
  }

  init() {
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
        this.build();
        dispatchEvent(element, EVENT_READY);
      })
      .catch(() => {
        setTimeout(() => {
          this.load();
        }, 1000);
      });
  }

  build() {
    this.render();
    this.renderStep(0);
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

  pay(options = {}) {
    this.payConfig = copyTemplate(
      copyTemplate(PAYMENT_DEFAULT, this.options),
      isPlainObject(options) && options,
    );
    if (this.ready) {
      this.show();
    } else {
      addListener(this.element, EVENT_READY, () => { this.show(); }, { once: true });
    }
  }

  show() {
    const { element } = this;
    if (!element.classList.contains('show')) {
      element.classList.add('show');
    }
    this.renderStep(0);
  }

  hide() {
    clearInterval(this.countdownInterval);
    clearInterval(this.pollResultInterval);
    const { element } = this;
    if (element.classList.contains('show')) {
      element.classList.remove('show');
    }
  }

  createPayment() {
    const { payInfo, payConfig, element } = this;
    const obj = copyTemplate(payConfig, {
      quoteAssetId: payInfo.quoteAsset.assetId,
      quoteAmount: payInfo.quoteAmount,
      paymentAssetId: payInfo.paymentAsset.assetId,
      note: payInfo.note,
      isChain: payInfo.isChain,
    });
    if (!obj.traceId) {
      obj.traceId = genUuid();
    }
    if (!obj.clientId) {
      obj.clientId = genUuid();
    }
    return APIS.createPayment(obj).then((data) => {
      const d = data.data;
      this.paymentInfo = {
        clientId: d.clientId,
        destination: d.destination,
        tag: d.tag,
        expire: d.expire,
        isChain: d.isChain,
        quoteAssetId: d.quoteAssetId,
        quoteAmount: d.quoteAmount,
        paymentAssetId: d.paymentAssetId,
        paymentAmount: d.paymentAmount,
        memo: d.memo,
        recipient: d.recipient,
        traceId: d.traceId,
      };
      dispatchEvent(element, EVENT_PAYMENT_CREATE, this.paymentInfo);
    }).catch((err) => Promise.reject(err));
  }

  getPaymentInfo() {
    return APIS.getPaymentResult(this.paymentInfo.traceId).then((data) => {
      const d = data.data;
      return Promise.resolve(d.status);
    }).catch((err) => Promise.reject(err));
  }

  static setDefaults(options) {
    assign(DEFAULT, isPlainObject(options) && options);
  }
}

assign(MixPay.prototype, events, render);

assign(MixPay, APIS, {
  newUUID() {
    return genUuid();
  },
});

export default MixPay;
