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

export enum METHODS {
  ALL = 0,
  E_WALLET = 1,
  INTERNATIONAL_CARD = 2,
  DOMESTIC_CARD = 3,
  PAYMENT_LATER = 4,
  QR_CODE = 5,
  INSTALLMENT = 6,
}

export enum SUPPORTED_METHODS {
  ALL = 0,
  E_WALLET_VALUE = 1,
  DOMESTIC_CARD_VALUE = 2,
  INTERNATIONAL_CARD_VALUE = 4,
  PAY_AT_STORE_VALUE = 8,
  TOKEN_VALUE = 16,
  INSTALLMENT_VALUE = 32,
  QR_CODE_VALUE = 64,
  APP_2_APP_VALUE = 128,
  QR_PAY_VALUE = 512,
  RECURRING_VALUE = 1024,
}

export enum RESULT {
  SUCCESS = 0,
  FAILURE = -1,
  CANCEL = 2,
  UNKNOWN = 1,
}

export const paymentPayoo = (
  orderInfo: string,
  checkSum: string,
  cashAmount: number,
  supportedMethods: number,
  callback: (data: any) => void,
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

  Payoo.pay(sdkConfig, orderInfo, checkSum, (data: any) => callback(data));
};
