export const DEFAULT = {
  apiBaseUrl: 'https://api.mixpay.me/v1',
  mode: 'modal', // modal | is-view
  withMark: true,

  onReady: null,
  onPaymentCreate: null,
  onPaymentSuccess: null,
  onPaymentFail: null,
};

export const PAYMENT_DEFAULT = {
  clientId: '',
  expireSeconds: '',
  isChain: false,
  note: '',
  payeeId: '',
  paymentAssetId: '',
  quoteAmount: '',
  quoteAssetId: '',
  remark: '',
  settlementAssetId: '',
  settlementMemo: '',
  settlementMethod: 'mixin', // 'mixin', 'mixpay
  traceId: '',
};
