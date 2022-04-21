import Qrious from 'qrious';
import { TEMPLATE_DEFAULT, TEMPLATE_MODAL } from './template';
import {
  EVENT_PAYMENT_ERROR, EVENT_PAYMENT_SUCCESS, NAMESPACE, IS_MIXIN,
} from './constants';
import { dispatchEvent, copy } from './utilities';

export default {
  render() {
    const { options, element } = this;
    element.setAttribute('class', options.isModal ? `${NAMESPACE} ${NAMESPACE}-modal` : NAMESPACE);
    if (options.isModal) {
      if (options.hasMask) {
        const mask = document.createElement('div');
        mask.setAttribute('class', `${NAMESPACE}-mask`);
        element.appendChild(mask);
      }
    }
    const container = document.createElement('div');
    container.setAttribute('class', `${NAMESPACE}-container`);
    container.innerHTML = options.isModal ? TEMPLATE_MODAL : TEMPLATE_DEFAULT;
    element.appendChild(container);

    this.$quoteSelectorToggle = this.element.querySelector(`.${NAMESPACE}-quote .${NAMESPACE}-selector__control`);
    this.$quoteSelectorSelected = this.element.querySelector(`.${NAMESPACE}-quote .${NAMESPACE}-selector__selected`);
    this.$quoteSelectorList = this.element.querySelector(`.${NAMESPACE}-quote .${NAMESPACE}-selector__list`);
    this.$quoteInput = this.element.querySelector(`.${NAMESPACE}-input input`);
    this.$quoteInputUnit = this.element.querySelector(`.${NAMESPACE}-input__right`);
    this.$quoteInputErr = this.element.querySelector(`.${NAMESPACE}-quote .${NAMESPACE}-step-error`);
    this.$quoteBtn = this.element.querySelector(`.${NAMESPACE}-quote button`);

    this.$paymentSelectorToggle = this.element.querySelector(`.${NAMESPACE}-payment .${NAMESPACE}-selector__control`);
    this.$paymentSelectorSelected = this.element.querySelector(`.${NAMESPACE}-payment .${NAMESPACE}-selector__selected`);
    this.$paymentSelectorList = this.element.querySelector(`.${NAMESPACE}-payment .${NAMESPACE}-selector__list`);
    this.$paymentMethods = this.element.querySelectorAll(`.${NAMESPACE}-radio input`);
    this.$paymentBtn = this.element.querySelector(`.${NAMESPACE}-payment button`);
    this.$paymentErr = this.element.querySelector(`.${NAMESPACE}-payment .${NAMESPACE}-step-error`);

    this.$countdown = this.element.querySelector('.countdown');
    this.$payInfoBtn = this.element.querySelector(`.${NAMESPACE}-info button`);

    this.$resultBtn = this.element.querySelector(`.${NAMESPACE}-result button`);

    const that = this;
    if (options.isModal) {
      that.element.querySelector(`.${NAMESPACE}-header__close`).onclick = function () {
        that.hide();
      };
    }
    that.$quoteSelectorList.innerHTML = this.quoteAssets
      .map(
        (item) => `<li data-id="${item.assetId}" /><img src="${item.iconUrl}" /><span>${item.symbol}</span></li>`,
      )
      .join('');
    that.$paymentSelectorList.innerHTML = this.paymentAssets
      .map(
        (item) => `<li data-id="${item.assetId}" /><img src="${item.iconUrl}" /><span>${item.symbol}</span>${item.network ? `<em>${item.network}</em>` : ''}`,
      )
      .join('');
    that.$quoteSelectorToggle.onclick = function () {
      if (that.$quoteSelectorList.classList.contains('show')) {
        that.$quoteSelectorList.classList.remove('show');
      } else {
        that.$quoteSelectorList.classList.add('show');
      }
    };
    that.$quoteSelectorList.onclick = function (e) {
      let target = e.target || e.srcElement;
      if (target === this) return;
      while (String(target.tagName).toUpperCase() !== 'LI') {
        target = target.parentNode;
      }
      that.setQuoteAsset(target.dataset.id);
      this.classList.remove('show');
    };
    that.$quoteInput.oninput = function (e) {
      if (/[0-9]/.test(e.data)) {
        that.setQuoteAmount(e.target.value);
      }
      if (e.data === null) {
        that.setQuoteAmount(e.target.value);
      }
    };
    that.$quoteBtn.onclick = function () {
      const { maxQuoteAmount, minQuoteAmount } = that.payInfo.quoteAsset;
      const { quoteAmount } = that.payInfo;
      let errMsg = '';
      if (+quoteAmount > +maxQuoteAmount || +quoteAmount < +minQuoteAmount) {
        errMsg = `<span>Out of range ${minQuoteAmount}-${maxQuoteAmount}</span>`;
      }
      that.$quoteInputErr.innerHTML = errMsg;
      if (!errMsg) {
        that.renderStep(1);
      }
    };
    that.$paymentSelectorToggle.onclick = function () {
      if (that.$paymentSelectorList.classList.contains('show')) {
        that.$paymentSelectorList.classList.remove('show');
      } else {
        that.$paymentSelectorList.classList.add('show');
      }
    };
    that.$paymentSelectorList.onclick = function (e) {
      let target = e.target || e.srcElement;
      if (target === this) return;
      while (String(target.tagName).toUpperCase() !== 'LI') {
        target = target.parentNode;
      }
      that.setPaymentAsset(target.dataset.id);
      this.classList.remove('show');
    };

    that.$paymentBtn.onclick = function () {
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      that.createPayment().then(() => {
        this.isSubmitting = false;
        that.renderStep(2);
      }).catch((err) => {
        this.isSubmitting = false;
        that.$paymentErr.innerHTML = `<span>${err.message}</span>`;
      });
    };

    [].forEach.call(that.$paymentMethods, (el) => {
      el.onclick = function () {
        that.setPaymentMethod(this.value);
      };
    });
  },

  renderStep(step, options = {}) {
    step = String(step);
    switch (step) {
      case '0':
        this.renderQuote();
        break;
      case '1':
        this.renderPayment();
        break;
      case '2':
        this.renderPayInfo();
        this.startCountdown();
        this.startPollResult();
        break;
      case '3':
        this.renderResult(options.status);
        break;
      default:
    }
    const steps = this.element.querySelectorAll(`.${NAMESPACE}-step`);
    [].forEach.call(steps, (el, index) => {
      if (String(index) === String(step)) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  },

  renderQuote() {
    const {
      quoteAssetId, quoteAmount, paymentMethod, paymentAssetId,
    } = this.payConfig;
    this.setQuoteAsset(quoteAssetId);
    this.setQuoteAmount(quoteAmount);
    this.setPaymentMethod(paymentMethod || 'mixin');
    this.setPaymentAsset(paymentAssetId);
    this.$quoteInputErr.innerHTML = '';
    if (quoteAssetId && quoteAmount > 0) {
      this.renderStep(1);
    }
  },

  renderPayment() {
    const { quoteAsset, quoteAmount } = this.payInfo;
    const $title = this.element.querySelector(`.${NAMESPACE}-payment .${NAMESPACE}-step-title`);
    $title.innerHTML = `<img src="${quoteAsset.iconUrl}" /><strong>${quoteAmount} ${quoteAsset.symbol}</strong>`;
    this.$paymentErr.innerHTML = '';
  },

  renderPayInfo() {
    const {
      element, paymentInfo, paymentAssets,
    } = this;
    const {
      paymentAssetId,
      paymentAmount,
      isChain,
      destination,
      tag,
      traceId,
      memo,
      recipient,
    } = paymentInfo;
    const paymentAsset = paymentAssets.find((item) => item.assetId === paymentAssetId);

    const $qrious = element.querySelector('.qrious');
    const $title = element.querySelector(`.${NAMESPACE}-info .${NAMESPACE}-step-title`);

    $qrious.innerHTML = '';
    $title.innerHTML = `<img src="${paymentAsset.iconUrl}" /><strong>${paymentAmount} ${paymentAsset.symbol}</strong>`;
    if (isChain) {
      const wrapperAddress = document.createElement('div');
      wrapperAddress.setAttribute('class', 'qrious-item');
      const canvasAddress = document.createElement('canvas');
      const textAddress = document.createElement('span');
      textAddress.setAttribute('data-id', 'address');
      textAddress.innerHTML = `Address: <br/><em>${destination}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M18.167 10h-6.375c-.783 0-1.417.597-1.417 1.333v6c0 .737.634 1.334 1.417 1.334h6.375c.782 0 1.416-.597 1.416-1.334v-6c0-.736-.634-1.333-1.416-1.333z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.542 14h-.709a1.46 1.46 0 01-1.001-.39 1.295 1.295 0 01-.415-.943v-6c0-.354.149-.693.415-.943a1.46 1.46 0 011.001-.39h6.375c.376 0 .736.14 1.002.39s.415.589.415.943v.666" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></em>`;
      // eslint-disable-next-line no-new
      new Qrious({
        element: canvasAddress,
        value: destination,
        size: 600,
        level: 'H',
      });
      wrapperAddress.appendChild(textAddress);
      wrapperAddress.appendChild(canvasAddress);
      $qrious.appendChild(wrapperAddress);
      if (tag) {
        const wrapperMemo = document.createElement('div');
        wrapperMemo.setAttribute('class', 'qrious-item');
        const canvasMemo = document.createElement('canvas');
        const textMemo = document.createElement('span');
        textMemo.setAttribute('data-id', 'memo');
        textMemo.innerHTML = `Memo: <br/><em>${tag}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M18.167 10h-6.375c-.783 0-1.417.597-1.417 1.333v6c0 .737.634 1.334 1.417 1.334h6.375c.782 0 1.416-.597 1.416-1.334v-6c0-.736-.634-1.333-1.416-1.333z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.542 14h-.709a1.46 1.46 0 01-1.001-.39 1.295 1.295 0 01-.415-.943v-6c0-.354.149-.693.415-.943a1.46 1.46 0 011.001-.39h6.375c.376 0 .736.14 1.002.39s.415.589.415.943v.666" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></em>`;
        // eslint-disable-next-line no-new
        new Qrious({
          element: canvasMemo,
          value: tag,
          size: 600,
          level: 'H',
        });
        wrapperMemo.appendChild(textMemo);
        wrapperMemo.appendChild(canvasMemo);
        $qrious.appendChild(wrapperMemo);
      }
      [].forEach.call($qrious.querySelectorAll('em'), (el) => {
        el.onclick = function () {
          clearTimeout(this.timeout);
          if (copy(this.textContent)) {
            this.classList.add('copy-success');
          }
          this.timeout = setTimeout(() => {
            this.classList.remove('copy-success');
          }, 2000);
        };
      });
      this.$payInfoBtn.innerText = 'Pay with any wallet';
      this.$payInfoBtn.style.display = 'none';
    } else {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'qrious-item');
      const canvas = document.createElement('canvas');
      // eslint-disable-next-line no-new
      new Qrious({
        element: canvas,
        value: `https://mixin.one/pay?recipient=${recipient}&asset=${paymentAssetId}&amount=${paymentAmount}&trace=${traceId}&memo=${memo}`,
        size: 600,
        level: 'H',
      });
      wrapper.appendChild(canvas);
      $qrious.appendChild(wrapper);
      this.$payInfoBtn.innerText = 'Pay with Mixin Wallet';
      this.$payInfoBtn.style.display = IS_MIXIN ? 'block' : 'none';
      this.$payInfoBtn.onclick = function () {
        window.location.href = `https://mixin.one/pay?recipient=${recipient}&asset=${paymentAssetId}&amount=${paymentAmount}&trace=${traceId}&memo=${memo}`;
      };
    }
  },

  renderResult(status = 'success') {
    const { element } = this;
    const $success = element.querySelector(`.${NAMESPACE}-result__success`);
    const $failed = element.querySelector(`.${NAMESPACE}-result__failed`);
    const $button = element.querySelector(`.${NAMESPACE}-result button`);
    const that = this;
    if (status === 'success') {
      $success.style.display = 'flex';
      $failed.style.display = 'none';
      $button.style.display = 'none';
    }
    if (status === 'failed') {
      $success.style.display = 'none';
      $failed.style.display = 'flex';
      $button.style.display = 'block';
      $button.onclick = function () {
        that.renderStep(0);
      };
    }
  },

  startCountdown() {
    clearInterval(this.countdownInterval);
    const { paymentInfo, element } = this;
    const countdown = () => {
      const diff = paymentInfo.expire - Math.ceil(new Date().getTime() / 1000);
      if (diff >= 0) {
        this.$countdown.innerHTML = `Please complete the payment within <strong>${diff}s</strong>`;
      } else {
        clearInterval(this.countdownInterval);
        clearInterval(this.pollResultInterval);
        this.getPaymentInfo().then((status) => {
          if (status !== 'unpaid') {
            dispatchEvent(element, EVENT_PAYMENT_SUCCESS);
            this.renderStep(3, { status: 'success' });
          } else {
            dispatchEvent(element, EVENT_PAYMENT_ERROR);
            this.renderStep(3, { status: 'failed' });
          }
        }).catch((err) => {
          dispatchEvent(element, EVENT_PAYMENT_ERROR, err);
          this.renderStep(3, { status: 'failed' });
        });
      }
    };
    this.countdownInterval = setInterval(countdown, 1000);
    countdown();
  },

  startPollResult() {
    clearInterval(this.pollResultInterval);
    this.pollResultInterval = setInterval(() => {
      this.getPaymentInfo().then((status) => {
        if (status !== 'unpaid') {
          clearInterval(this.pollResultInterval);
          clearInterval(this.countdownInterval);
          this.renderStep(3, { status: 'success' });
        }
      }).catch(() => { });
    }, 2000);
  },

  setQuoteAsset(value) {
    const selected = this.quoteAssets.find((item) => item.assetId === value) || this.quoteAssets[0];
    this.payInfo.quoteAsset = selected;
    this.$quoteSelectorSelected.innerHTML = `<img src="${selected.iconUrl}" /><span>${selected.symbol}</span>`;
    this.$quoteInputUnit.innerHTML = selected.symbol;
    this.$quoteInputErr.innerHTML = '';
  },

  setQuoteAmount(value) {
    const { decimalDigit } = this.payInfo.quoteAsset;
    let output = String(value).replace(/[^0-9.]/g, '');
    if (output === '.') {
      output = '0.';
    }
    const len = output.length - 1;
    if (output[len - 1] === '.' && output.indexOf('.') !== len - 1) {
      output = output.slice(0, len - 2);
    }
    const outputArr = output.split('.');
    if (decimalDigit <= 0) {
      [output] = outputArr;
    } else if (outputArr[1] !== undefined) {
      output = `${outputArr[0]}.${outputArr[1].slice(0, decimalDigit)}`;
    }
    this.payInfo.quoteAmount = output;
    this.$quoteInput.value = output;
  },

  setPaymentAsset(value) {
    const selected = this.paymentAssets.find((item) => item.assetId === value)
      || this.paymentAssets[0];
    this.payInfo.paymentAsset = selected;
    this.$paymentSelectorSelected.innerHTML = `<img src="${selected.iconUrl}" /><span>${selected.symbol}</span>${selected.network ? `<em>${selected.network}</em>` : ''}`;
  },

  setPaymentMethod(paymentMethod) {
    if (paymentMethod === 'mixin') {
      this.payInfo.isChain = false;
      this.$paymentMethods[0].checked = true;
      this.$paymentMethods[1].checked = false;
    }
    if (paymentMethod === 'chain') {
      this.payInfo.isChain = true;
      this.$paymentMethods[0].checked = false;
      this.$paymentMethods[1].checked = true;
    }
  },
};
