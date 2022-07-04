window.onload = function () {
  var MixPay = window.MixPay;

  var origin = window.location.origin;

  if (origin.startsWith('file://') || origin.startsWith('https://mixpay.mixpmt.me')) {
    MixPay.setConfig({ API_URL: 'https://mixpay-api.mixpmt.me/v1' });
  }

  var app = document.getElementById('app');

  var MixPay = window.MixPay;
  var btn1 = document.getElementById('button1');
  var btn2 = document.getElementById('button2');

  var clientId = MixPay.newUUID();

  var instance1 = new MixPay(app, {
    isModal: true,
    hasMask: true,
    payeeId: '093bf620-9aba-4dab-90ad-6f2c9b32bb39',
    settlementAssetId: '4d8c508b-91c5-375b-92b0-ee702ed2dac5',
    settlementMemo: 'this is a demo.',
    settlementMethod: 'mixin',
    clientId: clientId,
    expireSeconds: 180,
    orderId: '123131',
    fontSize: 16,
    remark: 'this is a demo.',

    onReady: function () {
      console.log('ready');
    },
    onShow: function () {
      console.log('show');
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
      console.log('fail');
    },
  });

  btn1.onclick = function () {
    if (!instance1.isShow) {
      instance1.show();
    } else {
      instance1.close();
    }
  };

  btn2.onclick = function () {
    instance1 && instance1.destroy();
  };
};
