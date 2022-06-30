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
<link href="https://cdn.jsdelivr.net/npm/mixpayjs/dist/mixpay.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/mixpayjs/dist/mixpay.min.js""></script>
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

### show()
### hide()

show/hide the modal, if `isModal` is `true`

## Global Methods

### newUUID()

create a random UUID for `clientId` and `traceId`

## Resources

* [Documentation API](https://developers.mixpay.me/docs/api-overview)