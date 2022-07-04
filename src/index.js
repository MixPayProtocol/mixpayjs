import Qrious from 'qrious';
import {
  CONFIG,
  EVENT_MODAL_CLOSE,
  EVENT_MODAL_SHOW,
  EVENT_PAYMENT_CREATE,
  EVENT_PAYMENT_FAILED,
  EVENT_PAYMENT_SUCCESS,
  EVENT_READY,
  IS_BROWSER,
  IS_MIXIN,
  LANG,
  NAMESPACE,
  OPTIONS_DEFAULT,
  PAYMENT_DEFAULT,
} from './constants';
import {
  addListener,
  assign,
  copy,
  dispatchEvent,
  forEach,
  genUuid,
  hasClass,
  isFunction,
  isPlainObject,
  pureAssign,
  query,
  queryAll,
  removeListener,
  setHTML,
  setStyle,
  setText,
  toFixed,
  toggleClass,
} from './utilities';
import APIS from './apis';
import { SVG_TEMPLATE, TEMPLATE } from './template';

const t = (name) => `.${NAMESPACE}-${name}`;

function MixPay(wrapper, options) {
  if (!IS_BROWSER) {
    throw new Error('A browser is needed!');
  }

  this.$wrapper = wrapper || document.body;
  this.$element = null;

  this.options = assign({}, OPTIONS_DEFAULT, isPlainObject(options) && options);
  this.options.clientId = this.options.clientId || MixPay.newUUID();

  this.isShow = false;
  this.isUserConfirmed = false;

  this.countdownPoll = null;
  this.paymentResultPoll = null;

  this.params = {
    quoteAsset: {},
    quoteAmount: '',
    paymentAsset: {},
    paymentMethod: 'mixin',
  };

  this.payments = {
    isChain: false,
    clientId: '',
    traceId: '',
    destination: '',
    tag: '',
    paymentAmount: '',
    paymentAssetId: '',
    quoteAmount: '',
    quoteAssetId: '',
    recipient: '',
    memo: '',
    expire: '',
  };

  this.result = {
    status: 'unpaid',
    payableAmount: '',
    paymentAmount: '',
    paymentSymbol: '',
    quoteAmount: '',
    quoteSymbol: '',
    txid: '',
    date: '',
    failureCode: '',
    failureReason: '',
    surplusAmount: '',
  };

  this.init();
}

MixPay.prototype = {
  $svg: { isSVGLoaded: false },
  $apis: new APIS(),
  init() {
    this.renderSVG();
    this.render();
    this.bind();
    this.renderPage('loading');
    this.$apis.addReadyCallback(() => {
      const { quoteAssetId, quoteAmount } = this.options;
      const asset = this.$apis.quoteAssets.find((item) => item.assetId === quoteAssetId);
      this.params.quoteAsset = asset || this.$apis.quoteAssets[0];
      this.params.quoteAmount = quoteAmount > 0 ? quoteAmount : '';
      this.params.paymentAsset = this.$apis.paymentAssets[0];
      this.params.paymentMethod = 'mixin';
      if (quoteAssetId && quoteAmount > 0) {
        this.renderPage('payment');
      } else {
        this.renderPage('quote');
      }
      dispatchEvent(this.$element, EVENT_READY);
    });
  },
  renderSVG() {
    if (this.$svg.isSVGLoaded) return;
    const wrapper = document.createElement('div');
    wrapper.setAttribute('style', 'position:absolute;width:0;height:0;');
    wrapper.innerHTML = SVG_TEMPLATE;
    const body = document.body;
    body.insertBefore(wrapper, body.childNodes[0]);
    this.$svg.isSVGLoaded = true;
  },
  render() {
    const { isModal, hasMask, fontSize } = this.options;
    const $wrapper = this.$wrapper;
    const $element = document.createElement('div');
    let _fontSize = parseFloat(fontSize);
    if (Number.isNaN(_fontSize)) {
      _fontSize = 14;
    }
    $element.classList.add(NAMESPACE);
    setStyle($element, 'font-size', _fontSize + 'px');
    if (isModal) {
      toggleClass($element, 'is-modal');
      setStyle($element, 'display', 'none');
      if (hasMask) {
        const mask = document.createElement('div');
        toggleClass(mask, `${NAMESPACE}-mask`);
        $element.appendChild(mask);
      }
    }
    const container = document.createElement('div');
    toggleClass(container, `${NAMESPACE}-container`);
    container.innerHTML = TEMPLATE;
    $element.appendChild(container);
    $wrapper.appendChild($element);
    this.$element = $element;
    const $closeBtn = query($element, t('header__action'));
    const $quote = query($element, t('field[data-page=quote]'));
    const $quoteDropdown = query($quote, t('dropdown__toggle'));
    const $quoteList = query($quote, t('dropdown__menu'));
    const $quoteSelected = query($quote, t('dropdown__selected'));
    const $quoteInput = query($quote, t('input-item__input'));
    const $quoteUnit = query($quote, t('input-item__right'));
    const $quoteError = query($quote, t('field__error'));
    const $quoteNextBtn = query($quote, 'button');
    const $payment = query($element, t('field[data-page=payment'));
    const $paymentDropdown = query($payment, t('dropdown__toggle'));
    const $paymentList = query($payment, t('dropdown__menu'));
    const $paymentSelected = query($payment, t('dropdown__selected'));
    const $paymentError = query($payment, t('field__error'));
    const $paymentNextBtn = query($payment, t('btn-primary'));
    const $paymentBackBtn = query($payment, t('btn-inline'));
    const $paymentRadios = query($payment, `${t('field-item:nth-child(2)')} ${t('field-item__content')}`);
    const $mixin = query($element, t('field[data-page="checkout-mixin"]'));
    const $mixinPaidBtn = query($mixin, t('btn-primary'));
    const $mixinBackBtn = query($mixin, t('btn-inline'));
    const $mixinCountdown = query($mixin, t('checkout__countdown'));
    const $chain = query($element, t('field[data-page=checkout-chain]'));
    const $chainPaidBtn = query($chain, t('btn-primary'));
    const $chainBackBtn = query($chain, t('btn-inline'));
    const $chainCountdown = query($chain, t('checkout__countdown'));
    const $checking = query($element, t('field[data-page=checking]'));
    const $checkingBackBtn = query($checking, t('btn-inline'));
    const $failed = query($element, t('field[data-page=failed]'));
    const $failedBtn = query($failed, t('btn-primary'));
    const $overtime = query($element, t('field[data-page=overtime]'));
    const $overtimeBtn = query($overtime, t('btn-primary'));
    const $overtimeError = query($overtime, t('field__error'));

    const that = this;

    const copyEvent = function () {
      const content = query(this, t('copy-content'));
      if (!content) return;
      if (copy(content.innerText)) {
        clearTimeout(this.timeout);
        if (!hasClass(this, 'copy-success')) {
          toggleClass(this, 'copy-success');
        }
        this.timeout = setTimeout(() => {
          toggleClass(this, 'copy-success');
        }, 3000);
      }
    };
    forEach(queryAll($element, t('copy-toggle')), (ele) => {
      ele.onclick = copyEvent;
    });
    const regularTaskFn = function (isChain) {
      const countdown = isChain ? $chainCountdown : $mixinCountdown;
      return function (diff) {
        countdown.innerHTML = LANG.checkout.countdown.replace(/\$1/, `${diff}s`);
      };
    };
    const endTask = function () {
      const { clientId, traceId, isChain, paymentAssetId, quoteAmount, quoteAssetId } = that.payments;
      const $field = query(that.$element, t(`field[data-page=checkout-${isChain ? 'chain' : 'mixin'}]`));
      const $btns = query($field, t('btn-group'));
      setStyle($btns, 'visibility', 'hidden');
      that.$apis
        .getPaymentResult(clientId, traceId)
        .then((result) => {
          const r = result.data;
          that.result.status = r.status;
          that.result.payableAmount = r.payableAmount;
          that.result.paymentAmount = r.paymentAmount;
          that.result.paymentSymbol = r.paymentSymbol;
          that.result.quoteAmount = r.quoteAmount;
          that.result.quoteSymbol = r.quoteSymbol;
          that.result.txid = r.txid;
          that.result.date = r.date;
          that.result.failureCode = r.failureCode;
          that.result.failureReason = r.failureReason;
          that.result.surplusAmount = r.surplusAmount;

          if (r.status === 'unpaid') {
            const data = assign({}, pureAssign(PAYMENT_DEFAULT, that.options), {
              quoteAssetId,
              quoteAmount,
              paymentAssetId,
              isChain,
              traceId,
            });
            return that.$apis.createPayment(data).then((_data) => {
              const d = _data.data;
              that.payments = {
                isChain: d.isChain,
                clientId: d.clientId,
                traceId: d.traceId,
                destination: d.destination,
                tag: d.tag,
                paymentAmount: d.paymentAmount,
                paymentAssetId: d.paymentAssetId,
                quoteAmount: d.quoteAmount,
                quoteAssetId: d.quoteAssetId,
                recipient: d.recipient,
                memo: d.memo,
                expire: d.expire,
              };
              dispatchEvent(that.$element, EVENT_PAYMENT_CREATE, d);
              const regularTask = regularTaskFn(d.isChain);
              that.startCountdown(regularTask, endTask);
              that.startQueryOrder();
              that.renderPage(d.isChain ? 'checkoutChain' : 'checkoutMixin');
            });
          }
          switch (r.status) {
            case 'pending':
              that.renderPage('pending');
              break;
            case 'success':
              that.renderPage('success');
              dispatchEvent(that.$element, EVENT_PAYMENT_SUCCESS);
              break;
            case 'failed':
              that.renderPage('failed');
              dispatchEvent(that.$element, EVENT_PAYMENT_FAILED, { code: r.failureCode, reason: r.failureReason });
              break;
            default:
          }
        })
        .catch((e) => {
          console.error(e);
          that.renderPage('overtime');
        });
    };
    $closeBtn.onclick = function () {
      that.hide();
    };
    $quoteDropdown.onclick = function () {
      if (hasClass(this, 'disabled')) return;
      toggleClass($quoteList, 'show');
    };
    $quoteList.onclick = function (e) {
      const {
        $apis: { quoteAssets },
        params: { quoteAsset },
      } = that;
      let target = e.target || e.srcElement;
      if (target === this) return;
      while (String(target.tagName).toUpperCase() !== 'LI') {
        target = target.parentNode;
      }
      const assetId = target.dataset.id;
      const asset = quoteAssets.find((item) => item.assetId === assetId);
      if (!asset) return;
      if (asset.assetId === quoteAsset.assetId) {
        toggleClass($quoteList, 'show');
        return;
      }
      setHTML($quoteSelected, `<img src="${asset.iconUrl}" /><span>${asset.symbol}</span>`);
      $quoteInput.value = '';
      $quoteInput.setAttribute('placeholder', `${asset.minQuoteAmount} - ${asset.maxQuoteAmount}`);
      setText($quoteUnit, asset.symbol);
      setHTML($quoteError, '');
      that.params.quoteAsset = asset;
      that.params.quoteAmount = '';
      toggleClass($quoteList, 'show');
    };
    $quoteInput.oninput = function (e) {
      const {
        params: {
          quoteAsset: { decimalDigit },
        },
      } = that;
      let output = e.target.value;
      const outputArr = output.split('.');
      if (outputArr[1] !== undefined) {
        output = `${outputArr[0] || '0'}.${outputArr[1].slice(0, decimalDigit)}`;
      }
      if (output !== this.value) {
        this.value = output;
      }
      that.params.quoteAmount = this.value;
    };
    $quoteNextBtn.onclick = function () {
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      const {
        quoteAsset: { minQuoteAmount, maxQuoteAmount, symbol },
        quoteAmount,
      } = that.params;
      if (+quoteAmount < +minQuoteAmount || +quoteAmount > +maxQuoteAmount) {
        setHTML($quoteError, `<span>Out of range ${minQuoteAmount} - ${maxQuoteAmount} ${symbol}</span>`);
      } else {
        setHTML($quoteError, '');
        that.renderPage('payment');
      }
      this.isSubmitting = false;
    };
    $paymentDropdown.onclick = function () {
      toggleClass($paymentList, 'show');
    };
    $paymentList.onclick = function (e) {
      const {
        $apis: { paymentAssets },
        params: { paymentAsset, paymentMethod },
      } = that;
      let target = e.target || e.srcElement;
      if (target === this) return;
      while (String(target.tagName).toUpperCase() !== 'LI') {
        target = target.parentNode;
      }
      const assetId = target.dataset.id;
      const asset = paymentAssets.find((item) => item.assetId === assetId);
      if (!asset) {
        return;
      }
      if (paymentAsset.assetId === assetId) {
        toggleClass(this, 'show');
        return;
      }
      setHTML($paymentSelected, `<img src="${asset.iconUrl}" /><span>${asset.symbol}</span><em>${asset.network}</em>`);
      setHTML($paymentError, !asset.onChainSupported && paymentMethod === 'chain' ? LANG.error.notSupportChain : '');
      that.params.paymentAsset = asset;
      toggleClass(this, 'show');
    };
    $paymentRadios.onclick = function (e) {
      const target = e.target || e.srcElement;
      const {
        paymentAsset: { onChainSupported },
      } = that.params;
      if (String(target.tagName).toUpperCase() === 'INPUT') {
        that.params.paymentMethod = target.value;
        setHTML($paymentError, !onChainSupported && target.value === 'chain' ? LANG.error.notSupportChain : '');
      }
    };
    $paymentNextBtn.onclick = function () {
      if (this.isSubmitting) return;
      const { paymentAsset, paymentMethod, quoteAsset, quoteAmount } = that.params;
      if (!paymentAsset.onChainSupported && paymentMethod === 'chain') {
        setHTML($paymentError, LANG.error.notSupportChain);
        return;
      }
      $paymentError.innerHTML = '';
      toggleClass(this, 'inactive');
      this.isSubmitting = true;
      const data = assign({}, pureAssign(PAYMENT_DEFAULT, that.options), {
        quoteAssetId: quoteAsset.assetId,
        quoteAmount,
        paymentAssetId: paymentAsset.assetId,
        isChain: paymentMethod === 'chain',
      });
      data.traceId = data.traceId || genUuid();
      that.$apis
        .createPayment(data)
        .then((_data) => {
          const d = _data.data;
          that.payments = {
            isChain: d.isChain,
            clientId: d.clientId,
            traceId: d.traceId,
            destination: d.destination,
            tag: d.tag,
            paymentAmount: d.paymentAmount,
            paymentAssetId: d.paymentAssetId,
            quoteAmount: d.quoteAmount,
            quoteAssetId: d.quoteAssetId,
            recipient: d.recipient,
            memo: d.memo,
            expire: d.expire,
          };
          dispatchEvent(that.$element, EVENT_PAYMENT_CREATE, d);
          const regularTask = regularTaskFn(d.isChain);
          that.startCountdown(regularTask, endTask);
          that.startQueryOrder();
          that.renderPage(d.isChain ? 'checkoutChain' : 'checkoutMixin');
        })
        .catch((_err) => {
          setHTML($paymentError, `<span>${_err.message}</span>`);
        })
        .finally(() => {
          this.isSubmitting = false;
          toggleClass(this, 'inactive');
        });
    };
    $paymentBackBtn.onclick = function () {
      that.renderPage('quote');
    };
    $mixinPaidBtn.onclick = function () {
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      const { recipient, paymentAssetId, paymentAmount, traceId, memo } = that.payments;
      window.location.href = `mixin://pay?recipient=${recipient}&asset=${paymentAssetId}&amount=${paymentAmount}&trace=${traceId}&memo=${memo}`;
      setTimeout(() => {
        this.isSubmitting = false;
      }, 3000);
    };
    $mixinBackBtn.onclick = function () {
      clearInterval(that.countdownPoll);
      clearInterval(that.paymentResultPoll);
      that.renderPage('payment');
    };
    $chainPaidBtn.onclick = function () {
      clearInterval(that.countdownPoll);
      that.isUserConfirmed = true;
      that.renderPage('checking');
    };
    $chainBackBtn.onclick = function () {
      clearInterval(that.countdownPoll);
      clearInterval(that.paymentResultPoll);
      that.renderPage('payment');
    };
    $checkingBackBtn.onclick = function () {
      const { isChain } = that.payments;
      that.isUserConfirmed = false;
      const regularTask = regularTaskFn(isChain);
      that.startCountdown(regularTask, endTask);
      that.startQueryOrder();
      that.renderPage(isChain ? 'checkoutChain' : 'checkoutMixin');
    };
    $failedBtn.onclick = function () {
      const { quoteAssetId, quoteAmount } = that.options;
      if (quoteAssetId && quoteAmount > 0) {
        that.renderPage('payment');
      } else {
        that.renderPage('quote');
      }
    };
    $overtimeBtn.onclick = function () {
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      toggleClass(this, 'inactive');
      const { traceId, isChain, paymentAssetId, quoteAmount, quoteAssetId } = that.payments;
      const data = assign({}, pureAssign(PAYMENT_DEFAULT, that.options), {
        quoteAssetId,
        quoteAmount,
        paymentAssetId,
        isChain,
        traceId,
      });
      that.$apis
        .createPayment(data)
        .then((_data) => {
          const d = _data.data;
          that.payments = {
            isChain: d.isChain,
            clientId: d.clientId,
            traceId: d.traceId,
            destination: d.destination,
            tag: d.tag,
            paymentAmount: d.paymentAmount,
            paymentAssetId: d.paymentAssetId,
            quoteAmount: d.quoteAmount,
            quoteAssetId: d.quoteAssetId,
            recipient: d.recipient,
            memo: d.memo,
            expire: d.expire,
          };
          dispatchEvent(that.$element, EVENT_PAYMENT_CREATE, d);
          const regularTask = regularTaskFn(d.isChain);
          that.startCountdown(regularTask, endTask);
          that.startQueryOrder();
          that.renderPage(d.isChain ? 'checkoutChain' : 'checkoutMixin');
        })
        .catch((err) => {
          setHTML($overtimeError, `<span>${err.message}</span>`);
        })
        .finally(() => {
          this.isSubmitting = false;
          toggleClass(this, 'inactive');
        });
    };
  },
  renderPage(page) {
    const {
      $apis: { quoteAssets, paymentAssets },
      payments: { paymentAmount, destination, paymentAssetId, traceId, memo, recipient, tag },
      params: {
        quoteAsset: { iconUrl: qIcon, symbol: qSymbol, minQuoteAmount, maxQuoteAmount },
        quoteAmount,
        paymentAsset: { iconUrl: pIcon, symbol: pSymbol, network },
        paymentMethod,
      },
      options: { quoteAssetId: payAssetId, quoteAmount: payAmount },
      result,
    } = this;
    let activeIndex;
    let activeField;
    const fields = queryAll(this.$element, t('field'));
    const q = (selector) => query(activeField, t(selector));
    switch (page) {
      case 'loading':
        activeIndex = 0;
        break;
      case 'quote':
        activeIndex = 1;
        activeField = fields[activeIndex];
        if (payAssetId) {
          q('dropdown__toggle').classList.add('disabled');
        } else {
          q('dropdown__toggle').classList.remove('disabled');
        }
        setHTML(q('dropdown__selected'), `<img src="${qIcon}" /><span>${qSymbol}</span>`);
        setHTML(
          q('dropdown__menu'),
          quoteAssets.map((item) => `<li data-id="${item.assetId}"><img src="${item.iconUrl}" /><span>${item.symbol}</span></li>`).join('')
        );
        const qInput = q('input-item__input');
        qInput.value = quoteAmount;
        qInput.setAttribute('placeholder', `${minQuoteAmount} - ${maxQuoteAmount}`);
        setText(q('input-item__right'), qSymbol);
        setHTML(q('filed__error'), '');
        break;
      case 'payment':
        activeIndex = 2;
        activeField = fields[activeIndex];
        setHTML(q('field__header-main'), `<img src="${qIcon}" /><span>${quoteAmount} ${qSymbol}</span>`);
        setHTML(q('dropdown__selected'), `<img src="${pIcon}" /><span>${pSymbol}</span><em>${network}</em>`);
        setHTML(
          q('dropdown__menu'),
          paymentAssets
            .map((item) => `<li data-id="${item.assetId}"><img src="${item.iconUrl}" /><span>${item.symbol}</span><em>${item.network}</em></li>`)
            .join('')
        );
        const pInput = queryAll(activeField, 'input')[paymentMethod === 'chain' ? 1 : 0];
        pInput.checked = true;
        setStyle(q('btn-inline'), 'display', payAssetId && payAmount > 0 ? 'none' : 'inline-flex');
        break;
      case 'checkoutMixin':
        activeIndex = 3;
        activeField = fields[activeIndex];
        this.isUserConfirmed = false;
        const mixinImg = q('field__header-main img');
        mixinImg.setAttribute('src', pIcon);
        setHTML(q('field__header-main-text'), `<span class="${`${NAMESPACE}-copy-content`}">${paymentAmount}</span> ${pSymbol}`);
        setText(q('field__header-sub'), `${quoteAmount} ${qSymbol}`);
        const mixinCanvas = q('checkout__qrious canvas');
        new Qrious({
          element: mixinCanvas,
          level: 'H',
          size: 600,
          value: `mixin://pay?recipient=${recipient}&asset=${paymentAssetId}&amount=${paymentAmount}&trace=${traceId}&memo=${memo}`,
        });
        setStyle(q('btn-group'), 'visibility', 'visible');
        setStyle(q('btn-primary'), 'display', IS_MIXIN ? 'inline-flex' : 'none');
        break;
      case 'checkoutChain':
        activeIndex = 4;
        activeField = fields[activeIndex];
        this.isUserConfirmed = false;
        const chainImg = q('field__header-main img');
        chainImg.setAttribute('src', pIcon);
        setHTML(q('field__header-main-text'), `<span class="${`${NAMESPACE}-copy-content`}">${paymentAmount}</span> ${pSymbol}`);
        setText(q('field__header-sub'), `${quoteAmount} ${qSymbol}`);
        const chainCanvas = q('checkout__qrious canvas');
        new Qrious({
          element: chainCanvas,
          level: 'H',
          size: 600,
          value: destination,
        });
        const infos = queryAll(activeField, t('checkout__info-item > p'));
        setText(infos[0], network);
        setText(query(infos[1], t('copy-content')), destination);
        setText(infos[2], tag);
        setStyle(infos[2].parentNode, 'display', tag ? 'block' : 'none');
        setStyle(q('btn-group'), 'visibility', 'visible');
        break;
      case 'checking':
        activeIndex = 5;
        activeField = fields[activeIndex];
        setText(q('status-payment'), `${paymentAmount} ${pSymbol}`);
        setText(q('status-quote'), `${quoteAmount} ${qSymbol}`);
        break;
      case 'pending':
        activeIndex = 6;
        activeField = fields[activeIndex];
        setText(q('status-payment'), `${result.payableAmount} ${result.paymentSymbol}`);
        setText(q('status-quote'), `${result.quoteAmount} ${result.quoteSymbol}`);
        break;
      case 'success':
        activeIndex = 7;
        activeField = fields[activeIndex];
        setText(q('status-payment'), `${result.payableAmount} ${result.paymentSymbol}`);
        setText(q('status-quote'), `${result.quoteAmount} ${result.quoteSymbol}`);
        let desc = '';
        if (result.surplusAmount > 0) {
          desc = LANG.result.refundDesc
            .replace(/\$1/, `${result.payableAmount} ${result.paymentSymbol}`)
            .replace(/\$2/, toFixed(Number(result.paymentAmount) + Number(result.surplusAmount), 8) + ' ' + result.paymentSymbol);
        }
        setText(q('status-des'), desc);
        setStyle(q('status-des'), 'display', result.surplusAmount > 0 ? 'block' : 'none');
        break;
      case 'failed':
        activeIndex = 8;
        activeField = fields[activeIndex];
        let reason = LANG.error.codeTable[result.failureCode] || result.failureReason;
        if (String(result.failureCode) === '40024') {
          reason = reason.replace(/\$1/, `${result.payableAmount} ${result.paymentSymbol}`).replace(/\$2/, `${result.paymentAmount} ${result.paymentSymbol}`);
        }
        setText(q('status-des'), reason);
        setText(q('status-payment'), `${result.payableAmount} ${result.paymentSymbol}`);
        setText(q('status-quote'), `${result.quoteAmount} ${result.quoteSymbol}`);
        break;
      case 'overtime':
        activeIndex = 9;
        activeField = fields[activeIndex];
        setText(q('status-payment'), `${result.payableAmount} ${result.paymentSymbol}`);
        setText(q('status-quote'), `${result.quoteAmount} ${result.quoteSymbol}`);
        break;
      default:
    }
    forEach(fields, (field, index) => {
      if (index === activeIndex) {
        field.style.display = 'block';
      } else {
        field.style.display = 'none';
      }
    });
  },
  startCountdown(regularTask, endTask) {
    clearInterval(this.countdownPoll);
    const { expire } = this.payments;
    const task = () => {
      const diff = expire - Math.ceil(new Date().getTime() / 1000);
      if (diff >= 0) {
        regularTask(diff);
      } else {
        clearInterval(this.countdownPoll);
        clearInterval(this.paymentResultPoll);
        endTask();
      }
    };
    this.countdownPoll = setInterval(task, 1000);
    task();
  },
  startQueryOrder() {
    clearInterval(this.paymentResultPoll);
    const { clientId, traceId } = this.payments;
    this.paymentResultPoll = setInterval(() => {
      this.$apis
        .getPaymentResult(clientId, traceId)
        .then((data) => {
          const d = data.data;
          let statusChanged = false;
          let page = '';
          if (this.result.status !== d.status) {
            statusChanged = true;
          }
          this.result.status = d.status;
          this.result.payableAmount = d.payableAmount;
          this.result.paymentAmount = d.paymentAmount;
          this.result.paymentSymbol = d.paymentSymbol;
          this.result.quoteAmount = d.quoteAmount;
          this.result.quoteSymbol = d.quoteSymbol;
          this.result.txid = d.txid;
          this.result.date = d.date;
          this.result.failureCode = d.failureCode;
          this.result.failureReason = d.failureReason;
          this.result.surplusAmount = d.surplusAmount;

          switch (this.result.status) {
            case 'unpaid':
              if (this.isUserConfirmed) {
                page = 'checking';
              }
              break;
            case 'pending':
              clearInterval(this.countdownPoll);
              page = 'pending';
              break;
            case 'failed':
              clearInterval(this.countdownPoll);
              clearInterval(this.paymentResultPoll);
              page = 'failed';
              dispatchEvent(this.$element, EVENT_PAYMENT_FAILED, { code: d.failureCode, reason: d.failureReason });
              break;
            case 'success':
              clearInterval(this.countdownPoll);
              clearInterval(this.paymentResultPoll);
              page = 'success';
              dispatchEvent(this.$element, EVENT_PAYMENT_SUCCESS);
              break;
            default:
          }
          if (statusChanged && page) {
            this.renderPage(page);
          }
        })
        .catch(() => {});
    }, 5000);
  },
  destroy() {
    clearInterval(this.countdownPoll);
    clearInterval(this.paymentResultPoll);

    this.unbind();

    if (this.$wrapper && this.$element) {
      this.$wrapper.removeChild(this.$element);
    }
  },
  bind() {
    const { $element, options } = this;

    if (!$element) return;

    if (isFunction(options.onReady)) {
      addListener($element, EVENT_READY, options.onReady);
    }

    if (isFunction(options.onShow)) {
      addListener($element, EVENT_MODAL_SHOW, options.onShow);
    }

    if (isFunction(options.onClose)) {
      addListener($element, EVENT_MODAL_CLOSE, options.onClose);
    }

    if (isFunction(options.onPaymentCreate)) {
      addListener($element, EVENT_PAYMENT_CREATE, options.onPaymentCreate);
    }

    if (isFunction(options.onPaymentSuccess)) {
      addListener($element, EVENT_PAYMENT_SUCCESS, options.onPaymentSuccess);
    }

    if (isFunction(options.onPaymentFail)) {
      addListener($element, EVENT_PAYMENT_FAILED, options.onPaymentFail);
    }
  },
  unbind() {
    const { $element, options } = this;

    if (!$element) return;

    if (isFunction(options.onReady)) {
      removeListener($element, EVENT_READY, options.onReady);
    }

    if (isFunction(options.onShow)) {
      removeListener($element, EVENT_MODAL_SHOW, options.onShow);
    }

    if (isFunction(options.onClose)) {
      removeListener($element, EVENT_MODAL_CLOSE, options.onClose);
    }

    if (isFunction(options.onPaymentCreate)) {
      removeListener($element, EVENT_PAYMENT_CREATE, options.onPaymentCreate);
    }

    if (isFunction(options.onPaymentSuccess)) {
      removeListener($element, EVENT_PAYMENT_SUCCESS, options.onPaymentSuccess);
    }

    if (isFunction(options.onPaymentFail)) {
      removeListener($element, EVENT_PAYMENT_FAILED, options.onPaymentFail);
    }
  },
  show() {
    if (this.options.isModal && !this.isShow) {
      this.isShow = true;
      setStyle(this.$element, 'display', 'block');
      dispatchEvent(this.$element, EVENT_MODAL_SHOW);
    }
    return this;
  },
  hide() {
    if (this.options.isModal && this.isShow) {
      this.isShow = false;
      setStyle(this.$element, 'display', 'none');
      dispatchEvent(this.$element, EVENT_MODAL_CLOSE);
    }
    return this;
  },
};

MixPay.setOptionDefault = function (options) {
  assign(OPTIONS_DEFAULT, isPlainObject(options) && options);
};

MixPay.setPaymentDefault = function (options) {
  assign(PAYMENT_DEFAULT, isPlainObject(options) && options);
};

MixPay.setLang = function (options) {
  assign(LANG, isPlainObject(options) && options);
};

MixPay.setConfig = function (options) {
  assign(CONFIG, isPlainObject(options) && options);
};

MixPay.newUUID = genUuid;

export default MixPay;
