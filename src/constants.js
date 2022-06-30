export const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export const WINDOW = IS_BROWSER ? window : {};
export const EVENT_READY = 'ready';
export const EVENT_MODAL_CLOSE = 'close';
export const EVENT_PAYMENT_CREATE = 'create';
export const EVENT_PAYMENT_SUCCESS = 'success';
export const EVENT_PAYMENT_FAILED = 'failed';
export const NAMESPACE = '--mixpay';
export const IS_MIXIN = true || !!(
  (WINDOW.webkit && WINDOW.webkit.messageHandlers && WINDOW.webkit.messageHandlers.MixinContext) ||
  (WINDOW.MixinContext && WINDOW.MixinContext.getContext)
);

export const CONFIG = {
  API_URL: 'https://api.mixpay.me/v1',
};

export const OPTIONS_DEFAULT = {
  isModal: true,
  hasMask: true,
  fontSize: 14,

  onReady: null,
  onPaymentCreate: null,
  onPaymentSuccess: null,
  onPaymentFail: null
};

export const PAYMENT_DEFAULT = {
  clientId: '',
  expireSeconds: 90,
  isChain: false,
  note: '',
  payeeId: '',
  paymentAssetId: '',
  quoteAmount: '',
  quoteAssetId: '',
  remark: '',
  settlementAssetId: '',
  settlementMemo: '',
  settlementMethod: 'mixin', // 'mixin', 'mixpay'
  traceId: ''
};

export const LANG = {
  quote: {
    asset: 'Quote Asset',
    amount: 'Quote Amount'
  },
  payment: {
    asset: 'Payment Asset',
    wallet: 'Payment Wallet',
    mixin: 'Mixin Wallet',
    chain: 'On-chain Wallet'
  },
  checkout: {
    scanWithMixin: 'Scan with Mixin Messenger',
    countdown: 'Payment amount will be refreshed after <strong>$1</strong>',
    network: 'Network:',
    address: 'Address:',
    memo: 'Memo:'
  },
  result: {
    checking: 'Checking',
    checkingDesc: 'Payment information is being checked, please wait patlently.',
    pending: 'Pending',
    pendingDesc: 'Block confirmation takes time, please wait patiently.',
    success: 'Success',
    failed: 'Failed',
    overtime: 'Overtime',
    overtimeDesc: 'Payment overtime, please refresh and pay again.',
    refundDesc: 'The payable amount is $1, but you paid $2, Please tap "Help" to contact customer service for a refund.'
  },
  error: {
    notSupportChain: '<span>This crypto is not supported On-chain transaction.</span>',

    codeTable: {
      40000: 'Payment overtime.',
      40001: 'Receipt address is invalid. Maybe repeat transfer or timeout.',
      40020: 'Wrong asset paid.',
      40021: 'Double payment.',
      40022: 'Trace ID does not exist',
      40024: 'The payable amount is $1, but you paid $2, Please tap "Help" to contact customer service for a refund.'
    },
  },
  common: {
    copied: 'Copied',
    next: 'Next',
    back: 'Back',
    refresh: 'Refresh',
    confirmed: 'I have paid',
    help: 'Help',
    termsOfUse: 'Terms Of Use',
    openMixinMessenger: 'Open Mixin Messenger',
    payAgain: 'Pay again'
  },
};
