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
<div id="wrapper"></div>
```

```js
import MixPay from 'mixpayjs;

const element = document.getElementById('wrapper');
const mixpay = new MixPay(element, {
  width: '',
  height: '',
  isModal: false,
  withMask: false,
  payeeId: '',
  settlementAssetId: '',
  settlementMemo: '',
  settlementMethod: 'mixin',
  clientId: '',
  expireSeconds: '',
  remark: '',

  onReady() {},
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

### isModal

- Type: `Boolean`
- Default: `false`

### withMask

- Type: `Boolean`
- Default: `false`

### payeeId

- Type: `String`

### settlementAssetId

- Type: `String`

### settlementMemo

- Type: `String`

### settlementMethod

- Type: `String`
- Default: `'mixin'`
- Options:
  - `'mixin'`
  - `'mixpay'`

### clientId

- Type: `String`
- Default: `''`

### expireSeconds

- Type: `Number`,
- Default: `60`

### remark

- Type: `String`,
- Default: `''`

### onReady

- Type: `Function`,
- Default: `null`

### onClose

- Type: `Function`,
- Default: `null`

### onPaymentCreate

- Type: `Function`,
- Default: `null`

### onPaymentSuccess

- Type: `Function`,
- Default: `null`

### onPaymentFail

- Type: `Function`,
- Default: `null`

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

Get quote assets support cryptocurrency and fiat currency.

### getPaymentAssets()

Get payment assets only support cryptocurrency.

### getSettlementAssets()

Get settlement assets support cryptocurrency and fiat currency.

### createPayment(options)

Create a payment

### getPaymentDetail(traceId)

The details of the payment

### getEstPaymentAmount(options)

Get the estimated price and the estimated amount of the transaction.
