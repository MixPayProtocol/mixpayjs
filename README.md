# MixPay.js

## Main files

```text
dist/
├── mixpay.css
├── mixpay.min.css   (compressed)
├── mixpay.js        (UMD)
├── mixpay.min.js    (UMD, compressed)
├── mixpay.common.js (CommonJS, default)
└── mixpay.esm.js    (ES Module)
```

## Getting started

### Installation

```shell
npm install mixpayjs
```

In browser:

```html
<link href="/path/to/mixpay.css" rel="stylesheet" />
<script src="/path/to/mixpay.js"></script>
```

#### Syntax

```js
new MixPay(element, options);
```

- **element**
  - Type: `HTMLElement`
  - Default: `document.body`
- **options**
  - Type: `Object`
  - The options for payment. Check out the available [options](#options)

#### Example

```html
<div id="app"></div>
```

```js
import MixPay from 'mixpayjs';
import 'mixpay/dist/mixpay.css';

const element = document.getElementById('app');

const mixpay = new MixPay(element, {
  isModal: true,
  hasMask: true,
  payeeId: '',
  settlementAssetId: '',
  settlementMemo: '',
  settlementMethod: '',
  clientId: '',
  expireSeconds: '',
  remark: '',

  onReady() {},
  onClose() {},
  onPaymentCreate() {},
  onPaymentSuccess() {},
  onPaymentFail() {},
});

mixpay.pay({
  quoteAssetId: '',
  quoteAmount: '',
  paymentAssetId: '',
  note: '',
  isChain: true,
});
```

## Options

| params | type    | default  |  description |
| ------ | ------- | -------- | ----------- |
| isModal| boolean| false | Render as a modal |
| hasMask | boolean|  false | Has mask or not  |
| payeeId | string | '' | The Mixin UUID of the payee |
| settlementAssetId | string | '' | AssetId of settlement cryptocurrency |
| settlementMemo | string | '' | memo |
| settlementMethod | string | mixin | 'mixin' or 'mixpay', settle to your Mixin Wallet or MixPay Account |
| clientId | string | MixPay.newUUID() |  UUID of client of the payment |
| expireSeconds | number | 60 |  60-172800, expiration date of the payment  |
| remark | string | '' | Payees leave a message to payers |
| onReady | function | null | This event fires when quote assets and payment assets are loaded |
| onClose | function | null | This event fires when the modal is closed |
| onPaymentCreate | function | null  | This event fires when a payment is created |
| onPaymentSuccess | function | null | This event fires when a payment is successful |
| onPaymentFail | function | null | This event fires when a payment is failed  |

## Instance Methods

### pay(options)

- **options**
  - payeeId
  - settlementAssetId
  - settlementMemo
  - settlementMethod
  - clientId
  - expireSeconds
  - quoteAssetId
  - quoteAmount
  - paymentAssetId
  - note
  - traceId

## Global Methods

### newUUID()

create a random UUID for `clientId` and `traceId`

### getQuoteAssets()

Get quote assets support cryptocurrency and fiat currency. See the [Quote Assets](https://developers.mixpay.me/docs/api/assets/quote-assets) section in guide.

### getPaymentAssets()

Get payment assets only support cryptocurrency. See the [Payment Assets](https://developers.mixpay.me/docs/api/assets/payment-assets) section in guide.

### getSettlementAssets()

Get settlement assets support cryptocurrency and fiat currency. See the [Settlement Assets](https://developers.mixpay.me/docs/api/assets/settlement-assets) section in guide.

### createPayment(options)

Create a payment. See the [Accepting Payments](https://developers.mixpay.me/docs/api/payments/accepting-payments) section and the [On-chain Payments](https://developers.mixpay.me/docs/api/payments/onchain-payments) section in guide.

### getPaymentDetail(traceId)

The details of the payment. See the [Payments Results](https://developers.mixpay.me/docs/api/payments/payments-results) section in guide.

### getEstPaymentAmount(options)

Get the estimated price and the estimated amount of the transaction. See the [Payments Estimated](https://developers.mixpay.me/docs/api/payments/payments-estimated) section in guide.

## Resources

* [Documentation API](https://developers.mixpay.me/docs/api-overview)