import { CONFIG } from './constants';
import { isArray } from './utilities';
const ajax = {
  get(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url.startsWith('/') ? CONFIG.API_URL + url : url, true);
      xhr.timeout = 20000;
      xhr.ontimeout = function () {
        reject(new Error('Request timeout, please try it again later.'));
      };
      xhr.onerror = function (e) {
        reject(e);
      };
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (e) {
              resolve(xhr.responseText);
            }
          } else {
            try {
              const error = JSON.parse(xhr.responseText);
              reject(error);
            } catch (e) {
              reject(new Error(xhr.responseText));
            }
          }
        }
      };
      xhr.send();
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url.startsWith('/') ? CONFIG.API_URL + url : url, true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.timeout = 20000;
      xhr.ontimeout = function () {
        reject(new Error('Request timeout, please try it again later.'));
      };
      xhr.onerror = function (e) {
        reject(e);
      };
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (e) {
              resolve(xhr.responseText);
            }
          } else {
            try {
              const error = JSON.parse(xhr.responseText);
              reject(error);
            } catch (e) {
              reject(new Error(xhr.responseText));
            }
          }
        }
      };
      xhr.send(JSON.stringify(data));
    });
  },
};

class APIS {
  constructor() {
    this.isReady = false;
    this.callbacks = [];

    this.quoteAssets = [];
    this.paymentAssets = [];

    this.ready();
  }

  ready() {
    this.isReady = false;
    const promises = [];
    if (!this.quoteAssets.length) {
      promises.push(
        this.getQuoteAssets().then((data) => {
          this.quoteAssets = isArray(data.data) ? data.data : [];
        })
      );
    }
    if (!this.paymentAssets.length) {
      promises.push(
        this.getPaymentAssets().then((data) => {
          this.paymentAssets = isArray(data.data) ? data.data : [];
        })
      );
    }

    Promise.all(promises)
      .then(() => {
        this.isReady = true;
        for (let i = this.callbacks.length - 1; i >= 0; i--) {
          const callback = this.callbacks.pop();
          callback();
        }
      })
      .catch((e) => {
        console.log(e);
        setTimeout(() => {
          this.ready();
        }, 3000);
      });
  }

  addReadyCallback(callback) {
    if (typeof callback !== 'function') return;
    if (this.isReady) return callback();
    this.callbacks.push(callback);
  }

  getQuoteAssets() {
    return ajax.get('/setting/quote_assets');
  }
  getPaymentAssets() {
    return ajax.get('/setting/payment_assets');
  }
  getSettlementAssets() {
    return ajax.get('/setting/settlement_assets');
  }
  getEstAmount(data) {
    let url = '/payments_estimated?';
    Object.keys(data).forEach((key) => {
      url += `&${key}=${encodeURIComponent(data[key])}`;
    });
    return ajax.get(url);
  }
  getPaymentResult(clientId, traceId) {
    return ajax.get(`/payments_result?clientId=${clientId}&traceId=${traceId}`);
  }
  createPayment(data) {
    return ajax.post('/payments', data);
  }
}

export default APIS;
