import { AxiosInstance } from 'axios';
import { ClientRequest, OneTimePaymentLink, OneTimePaymentLinkParams, PayeeId, Payment, PaymentAssets, PaymentEstimated, PaymentParams, PaymentResult, QuoteAssets, SettlementAssets } from './../types/index';
export default class APIClient implements ClientRequest {
    apiKey: string;
    request: AxiosInstance;
    constructor(apiKey: string);
    readPayeeId(mixinId: string): Promise<PayeeId>;
    readQuoteAssets(payeeId?: string | undefined): Promise<QuoteAssets[]>;
    readPaymentAssets(payeeId?: string | undefined, quoteAssetId?: string | undefined, quoteAmount?: string | undefined): Promise<PaymentAssets[]>;
    readSettlementAssets(payeeId?: string | undefined, quoteAssetId?: string | undefined, quoteAmount?: string | undefined): Promise<SettlementAssets[]>;
    createMixinPayment(params: PaymentParams): Promise<Payment>;
    createChainPayment(params: PaymentParams): Promise<Payment>;
    createOneTimePaymentLink(params: OneTimePaymentLinkParams): Promise<OneTimePaymentLink>;
    getPaymentInfo(traceId: string, clientId: string): Promise<Payment>;
    getPaymentEstimated(paymentAssetId: string, settlementAssetId: string, quoteAssetId: string, quoteAmount: string, paymentAmount?: string): Promise<PaymentEstimated>;
    getPaymentResult(traceId?: string | undefined, orderId?: string | undefined, payeeId?: string | undefined): Promise<PaymentResult>;
}
