import { NAMESPACE, LOGO_IMAGE_URL } from './constants';

const t = (name) => `${NAMESPACE}-${name}`;

export const TEMPLATE_DEFAULT = `<div class="${t('content')}">\
  <div class="${t('step')} ${t('quote')}">\
    <div class="${t('step-content')}">\
      <div class="${t('selector')}">\
        <div class="${t('selector__title')}">Queto Asset</div>\
        <div class="${t('selector__content')}">\
          <div class="${t('selector__control')}">
            <div class="${t('selector__selected')}"></div>\
            <div class="${t('selector__icon')}"></div>\
          </div>\
          <ul class="${t('selector__list')}"></ul>\
        </div>\
      </div>\
      <div class="${t('input')}">\
        <div class="${t('input__title')}">Quote Amount</div>\
        <div class="${t('input__content')}">\
          <div class="${t('input__control')}">\
            <input type="number" name="quoteAmount" placeholder="Please enter the amount" />
          </div>\
          <div class="${t('input__right')}">USDT</div>\
        </div>\
      </div>\
      <div class="${t('step-error')}"></div>\
    </div>\
    <div class="${t('step-footer')}">\
      <button>Next</button>\
    </div>\
  </div>\
  <div class="${t('step')} ${t('payment')}">\
    <div class="${t('step-title')}"></div>\
    <div class="${t('step-content')}">\
      <div class="${t('selector')}">\
        <div class="${t('selector__title')}">Payment Asset</div>\
        <div class="${t('selector__content')}">\
          <div class="${t('selector__control')}">
            <div class="${t('selector__selected')}"></div>\
            <div class="${t('selector__icon')}"></div>\
          </div>\
          <ul class="${t('selector__list')}"></ul>\
        </div>\
      </div>\
      <div class="${t('radio')}">\
        <div class="${t('radio__title')}">Payment Wallet</div>\
        <div class="${t('radio__content')}">\
          <label>\
            <input name="paymentMethod" type="radio" value="mixin" />\
            <span>Mixin Wallet</span>\
          </label>\
          <label>\
            <input name="paymentMethod" type="radio" value="chain" />\
            <span>On-chain Transfer</span>\
          </label>\
        </div>\
      </div>\
      <div class="${t('step-error')}"></div>\
    </div>\
    <div class="${t('step-footer')}">\
      <button>Confirm</button>
    </div>\
  </div>\
  <div class="${t('step')} ${t('info')}">\
    <div class="${t('step-title')}"></div>\
    <div class="${t('step-content')}">\
      <div class="qrious"></div>\
      <p class="countdown"></p>\
    </div>\
    <div class="${t('step-footer')}">\
      <button>Pay with Wallet</button>\
    </div>\
  </div>\
  <div class="${t('step')} ${t('result')}">\
    <div class="${t('step-content')}">\
      <div class="${t('result__success')}">\
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="icon-success"><path d="M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M34.5548098,16.4485711 C33.9612228,15.8504763 32.9988282,15.8504763 32.4052412,16.4485711 L32.4052412,16.4485711 L21.413757,27.5805811 L21.413757,27.5805811 L21.4034642,27.590855 C21.0097542,27.9781674 20.3766105,27.9729811 19.9892981,27.5792711 L19.9892981,27.5792711 L15.5947588,23.1121428 C15.0011718,22.514048 14.0387772,22.514048 13.4451902,23.1121428 C12.8516033,23.7102376 12.8516033,24.6799409 13.4451902,25.2780357 L13.4451902,25.2780357 L19.6260786,31.5514289 C20.2196656,32.1495237 21.1820602,32.1495237 21.7756472,31.5514289 L21.7756472,31.5514289 L34.5548098,18.614464 C35.1483967,18.0163692 35.1483967,17.0466659 34.5548098,16.4485711 Z"></path></svg>\
        <span>Thank you! Your payment is finished.</span>\
      </div>\
      <div class="${t('result__failed')}">\
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="icon-error"><path d="M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.57818,15.42182 C32.0157534,14.8593933 31.1038797,14.8593933 30.541453,15.42182 L30.541453,15.42182 L24.0006789,21.9625941 L17.458547,15.42182 C16.8961203,14.8593933 15.9842466,14.8593933 15.42182,15.42182 C14.8593933,15.9842466 14.8593933,16.8961203 15.42182,17.458547 L15.42182,17.458547 L21.9639519,23.9993211 L15.42182,30.541453 C14.8593933,31.1038797 14.8593933,32.0157534 15.42182,32.57818 C15.9842466,33.1406067 16.8961203,33.1406067 17.458547,32.57818 L17.458547,32.57818 L24.0006789,26.0360481 L30.541453,32.57818 C31.1038797,33.1406067 32.0157534,33.1406067 32.57818,32.57818 C33.1406067,32.0157534 33.1406067,31.1038797 32.57818,30.541453 L32.57818,30.541453 L26.0374059,23.9993211 L32.57818,17.458547 C33.1406067,16.8961203 33.1406067,15.9842466 32.57818,15.42182 Z"></path></svg>\
        <span>Payment is invalid, please try again.</span>\
      </div>\
    </div>\
    <div class="${t('step-footer')}">
      <button>Pay it again</button>\
    </div>\
  </div>\
</div>`;

export const TEMPLATE_MODAL = `<div class="${t('header')}"><img src="${LOGO_IMAGE_URL}" class="${t('header__logo')}" /><i class="${t('header__close')}"></i></div>${TEMPLATE_DEFAULT}`;
