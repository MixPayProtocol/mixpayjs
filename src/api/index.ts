import { AxiosInstance } from 'axios';
import {
  ClientRequest,
  OneTimePaymentLink,
  OneTimePaymentLinkParams,
  PayeeId,
  Payment,
  PaymentAssets,
  PaymentEstimated,
  PaymentParams,
  PaymentResult,
  QuoteAssets,
  SettlementAssets,
} from './../types/index';
import { request } from './../utils/request';

export default class APIClient implements ClientRequest {
  apiKey: string;
  request: AxiosInstance;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.request = request(apiKey);
  }

  readPayeeId(mixinId: string): Promise<PayeeId> {
    return this.request.get(`/user/mixin_uuid/${mixinId}`);
  }

  readQuoteAssets(payeeId?: string | undefined): Promise<QuoteAssets[]> {
    return this.request.get('/setting/quote_assets', { params: { payeeId } });
  }

  readPaymentAssets(payeeId?: string | undefined, quoteAssetId?: string | undefined, quoteAmount?: string | undefined): Promise<PaymentAssets[]> {
    return this.request.get('/setting/payment_assets', {
      params: { payeeId, quoteAssetId, quoteAmount },
    });
  }

  readSettlementAssets(payeeId?: string | undefined, quoteAssetId?: string | undefined, quoteAmount?: string | undefined): Promise<SettlementAssets[]> {
    return this.request.get('/setting/settlement_assets', {
      params: {
        payeeId,
        quoteAssetId,
        quoteAmount,
      },
    });
  }

  createMixinPayment(params: PaymentParams): Promise<Payment> {
    params.isChain = false;
    params.linkId = params.linkId ?? 0;
    return this.request.post('/payments', params);
  }

  createChainPayment(params: PaymentParams): Promise<Payment> {
    params.isChain = true;
    params.linkId = params.linkId ?? 0;
    return this.request.post('/payments', params);
  }

  createOneTimePaymentLink(params: OneTimePaymentLinkParams): Promise<OneTimePaymentLink> {
    params.isTemp = true;
    return this.request.post('/one_time_payment', params);
  }

  getPaymentInfo(traceId: string, clientId: string): Promise<Payment> {
    return this.request.get('/payments_info', { params: { traceId, clientId } });
  }

  getPaymentEstimated(
    paymentAssetId: string,
    settlementAssetId: string,
    quoteAssetId: string,
    quoteAmount: string,
    paymentAmount?: string
  ): Promise<PaymentEstimated> {
    return this.request.get('/payments_estimated', {
      params: {
        paymentAssetId,
        settlementAssetId,
        quoteAmount,
        quoteAssetId,
        paymentAmount,
      },
    });
  }

  getPaymentResult(traceId?: string | undefined, orderId?: string | undefined, payeeId?: string | undefined): Promise<PaymentResult> {
    return this.request.get('/payments_result', { params: { traceId, orderId, payeeId } });
  }
}
