export type PaymentStatus = 'unpaid' | 'pending' | 'processing' | 'failed' | 'success';
export type SurplusStatus = 'no' | 'pending' | 'sending' | 'success';

export interface ChainAssets {
  id: string;
  name: string;
  symbol: string;
  iconUrl: string;
}

export interface PayeeId {
  payeeId: string;
}

export interface PaymentAssets {
  assetId: string;
  name: string;
  symbol: string;
  iconUrl: string;
  network: string;
  onChainSupported: boolean;
  minPaymentAmount: string;
  maxPaymentAmount: string;
}

export interface QuoteAssets {
  assetId: string;
  symbol: string;
  iconUrl: string;
  decimalDigit: number;
  isAsset: number;
  maxQuoteAmount: string;
  minQuoteAmount: string;
  chainAsset?: ChainAssets;
}

export interface SettlementAssets {
  assetId: string;
  name: string;
  symbol: string;
  iconUrl: string;
  network: string;
  isAsset: boolean;
  chainAsset?: ChainAssets;
}

export interface Payment {
  clientId: string;
  destination: string;
  estimatedSettlementAmount: string;
  expire: number;
  isChain: boolean;
  memo: string;
  payeeId: string;
  paymentAmount: string;
  paymentAssetId: string;
  paymentAssetSymbol: string;
  quoteAmount: string;
  quoteAssetId: string;
  quoteAssetSymbol: string;
  recipient: string;
  seconds: number;
  settlementAssetId: string;
  settlementAssetSymbol: string;
  tag: string;
  traceId: string;
}
export interface PaymentParams {
  callbackUrl?: string;
  expiredTimestamp?: string | number;
  expireSeconds?: string;
  failedReturnTo?: string;
  isChain: boolean;
  linkId?: string | number;
  note: string;
  orderId: string;
  payeeId: string;
  paymentAssetId: string;
  paymentMethod?: string;
  quoteAmount: string;
  quoteAssetId: string;
  remark: string;
  returnTo?: string;
  settlementAssetId: string;
  settlementMemo?: string;
  settlementMethod?: string;
  tagname?: string;
}
export interface OneTimePaymentLink {
  code: string,
}

export interface OneTimePaymentLinkParams {
  payeeId: string;
  quoteAmount?: string;
  quoteAssetId?: string;
  settlementAssetId?: string;
  isTemp?: boolean;
  paymentAssetId?: string;
  remark?: string;
  expireSeconds?: number;
  traceId?: string;
  orderId?: string;
  settlementMemo?: string;
  returnTo?: string;
  failedReturnTo?: string;
  callbackUrl?: string;
  origin?: string;
  linkId?: string;
}

export interface PaymentResult {
  status: PaymentStatus;
  quoteAmount?: string;
  quoteSymbol?: string;
  paymentAmount?: string;
  paymentSymbol?: string;
  payee?: string;
  payeeMixinNumber?: string;
  payeeAvatarUrl?: string;
  txid?: string;
  date?: number;
  surplusAmount?: string;
  surplusStatus?: SurplusStatus;
  confirmations?: number;
  payableAmount?: string;
  failureCode?: number | string;
  failureReason?: string;
  returnTo?: string;
  traceId?: string;
}

export interface PaymentEstimated {
  price: string;
  estimatedSettlementAmount: string;
  settlementAssetId: string;
  settlementAssetSymbol: string;
  paymentAssetId: string;
  paymentAssetSymbol: string;
  paymentAmount: string;
  quoteAssetSymbol: string;
  quoteAssetId: string;
  quoteAmount: string;
}

export interface ClientRequest {
  readPayeeId: (mixinId: string) => Promise<PayeeId>;

  readQuoteAssets: (payeeId?: string) => Promise<QuoteAssets[]>;
  readPaymentAssets: (payeeId?: string, quoteAssetId?: string, quoteAmount?: string) => Promise<PaymentAssets[]>;
  readSettlementAssets: (payeeId?: string, quoteAssetId?: string, quoteAmount?: string) => Promise<SettlementAssets[]>;

  createMixinPayment: (params: PaymentParams) => Promise<Payment>;
  createChainPayment: (params: PaymentParams) => Promise<Payment>;
  createOneTimePaymentLink: (params: OneTimePaymentLinkParams) => Promise<OneTimePaymentLink>;

  getPaymentResult: (traceId?: string, orderId?: string, payeeId?: string) => Promise<PaymentResult>;
  getPaymentEstimated: (
    paymentAssetId: string,
    settlementAssetId: string,
    quoteAssetId: string,
    quoteAmount: string,
    paymentAmount?: string
  ) => Promise<PaymentEstimated>;
  getPaymentInfo: (traceId: string, clientId: string) => Promise<Payment>;
}
