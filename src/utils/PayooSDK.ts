import Config from 'react-native-config';
import Payoo from '../../payoo';

enum ENV {
  dev = 0,
  pro = 1,
}

enum LANG {
  vn = 0,
  en = 1,
}

export const paymentPayoo = (
  orderInfo,
  checkSum,
  cashAmount,
  supportedMethods,
  data,
) => {
  const sdkConfig = {
    Environment: ENV.dev,
    Language: LANG.vn,
    MerchantId: Config.MERCHANTID_DEV,
    MerchantShareKey: Config.MERCHANTSHAREKEY_DEV,
    PayooCashAmount: cashAmount,
    SupportedMethods: supportedMethods,
    AppCode: 'Payoo',
  };

  Payoo.pay(sdkConfig, orderInfo, checkSum, data =>
    console.log('PayooResponse', data),
  );
};
