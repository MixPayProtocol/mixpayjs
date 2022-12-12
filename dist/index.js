/*!
 * mixpayjs v2.1.4
 * https://mixpay.me
 *
 * Copyright 2022 gypsophila@mathunion.xyz
 * Released under the MIT license
 *
 * Date: 2022-12-12T02:32:39.134Z
 */
"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=e(require("axios"));const s=["https://api.mixpay.me/v1"],r=(e="")=>{const r=t.default.create({baseURL:s[0],headers:{"Content-Type":"application/json;charset=UTF-8"},timeout:2e4});return r.interceptors.request.use((e=>e)),r.interceptors.response.use((e=>{const{data:t,success:s,message:r}=e.data;return s?t:Promise.reject(Error(r))}),(async e=>["ETIMEDOUT","ECONNABORTED"].includes(e.code)?(await((e=500)=>new Promise((t=>setTimeout(t,e))))(),r(e.config)):Promise.reject(e))),r};class n{apiKey;request;constructor(e){this.apiKey=e,this.request=r(e)}readPayeeId(e){return this.request.get("/user/mixin_uuid/"+e)}readQuoteAssets(e){return this.request.get("/setting/quote_assets",{params:{payeeId:e}})}readPaymentAssets(e,t,s){return this.request.get("/setting/payment_assets",{params:{payeeId:e,quoteAssetId:t,quoteAmount:s}})}readSettlementAssets(e,t,s){return this.request.get("/setting/settlement_assets",{params:{payeeId:e,quoteAssetId:t,quoteAmount:s}})}createMixinPayment(e){return e.isChain=!1,e.linkId=e.linkId??0,this.request.post("/payments",e)}createChainPayment(e){return e.isChain=!0,e.linkId=e.linkId??0,this.request.post("/payments",e)}createOneTimePaymentLink(e){return e.isTemp=!0,this.request.post("/one_time_payment",e)}getPaymentInfo(e,t){return this.request.get("/payments_info",{params:{traceId:e,clientId:t}})}getPaymentEstimated(e,t,s,r,n){return this.request.get("/payments_estimated",{params:{paymentAssetId:e,settlementAssetId:t,quoteAmount:r,quoteAssetId:s,paymentAmount:n}})}getPaymentResult(e,t,s){return this.request.get("/payments_result",{params:{traceId:e,orderId:t,payeeId:s}})}}module.exports=function(e=""){return new n(e)};
