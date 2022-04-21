export const DEFAULT = {
  apiUrl: 'https://api.mixpay.me/v1',
  isModal: true,
  hasMask: true,

  onReady: null,
  onPaymentCreate: null,
  onPaymentSuccess: null,
  onPaymentFail: null,
};

export const PAYMENT_DEFAULT = {
  clientId: '',
  expireSeconds: 240,
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
  traceId: '',
};
