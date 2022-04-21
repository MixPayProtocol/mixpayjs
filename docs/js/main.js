window.onload = function () {
  var MixPay = window.MixPay;
  var app = document.getElementById('app');
  var button = document.getElementById('button');

  var instance = new MixPay(app, {
    isModal: false,
    hasMask: true,
    payeeId: '093bf620-9aba-4dab-90ad-6f2c9b32bb39',
    settlementAssetId: '4d8c508b-91c5-375b-92b0-ee702ed2dac5',
    settlementMemo: '',
    settlementMethod: 'mixin',
    clientId: '',
    expireSeconds: 60,
    remark: '',

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

  window.instance = instance;

  button.onclick = function() {
    instance.pay({
      payeeId: '093bf620-9aba-4dab-90ad-6f2c9b32bb39',
      settlementAssetId: '4d8c508b-91c5-375b-92b0-ee702ed2dac5',
    });
  }
}