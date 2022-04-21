window.onload = function () {
  var MixPay = window.MixPay;
  var app = document.getElementById('app');
  var btn1 = document.getElementById('button1');
  var btn2 = document.getElementById('button2');
  var btn3 = document.getElementById('button3');

  var clientId = MixPay.newUUID();

  var mixpay = new MixPay(app, {
    isModal: true,
    hasMask: true,
    payeeId: '093bf620-9aba-4dab-90ad-6f2c9b32bb39',
    settlementAssetId: '4d8c508b-91c5-375b-92b0-ee702ed2dac5',
    settlementMemo: 'this is a demo.',
    settlementMethod: 'mixin',
    clientId: clientId,
    expireSeconds: 180,
    remark: 'this is a demo.',

    onReady: function () {
      console.log('ready');
    },
    onClose: function () {
      console.log('close');
    },
    onPaymentCreate: function () {
      console.log('create');
    },
    onPaymentSuccess: function () {
      console.log('success');
    },
    onPaymentFail: function () {
      console.log('fail')
    }
  });

  btn1.onclick = function () {
    mixpay.pay();
  }

  btn2.onclick = function() {
    mixpay.pay({
      quoteAssetId: 'usd'
    });
  }

  btn3.onclick = function () {
    mixpay.pay({
      quoteAssetId: 'usd',
      quoteAmount: '1',
    });
  }
}