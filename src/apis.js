import { CONFIG } from './constants';


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
  }
};

export default {
  getQuoteAssets() {
    return ajax.get('/setting/quote_assets');
  },
  getPaymentAssets() {
    return ajax.get('/setting/payment_assets');
  },
  getSettlementAssets() {
    return ajax.get('/setting/settlement_assets');
  },
  getEstAmount(paymentAssetId, settlementAssetId, quoteAmount, quoteAssetId) {
    const url = `/payments_estimated?paymentAssetId=${paymentAssetId}&settlementAssetId=${settlementAssetId}&quoteAmount=${quoteAmount}&quoteAssetId=${quoteAssetId}`;
    return ajax.get(url);
  },
  getPaymentResult(clientId, traceId) {
    return ajax.get(`/payments_result?clientId=${clientId}&traceId=${traceId}`);
  },
  createPayment(data) {
    return ajax.post('/payments', data);
  }
};
