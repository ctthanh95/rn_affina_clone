import React from 'react';
import {useRoute} from '@react-navigation/native';
import {Atm, Cash_Payment, Credit, Installment} from '@utils/svg';
import View from './view';
import {METHODS, SUPPORTED_METHODS} from '@utils/PayooSDK';

const DATA_METHOD_PAYMENT = [
  {
    title: 'Thẻ ATM',
    icon: Atm,
    id: METHODS.DOMESTIC_CARD,
    payoo: SUPPORTED_METHODS.DOMESTIC_CARD_VALUE,
  },
  {
    title: 'Thẻ credit (Visa, Master)',
    icon: Credit,
    id: METHODS.INTERNATIONAL_CARD,
    payoo: SUPPORTED_METHODS.INTERNATIONAL_CARD_VALUE,
  },
  // {
  //   title: 'Trả góp qua thẻ tính dụng',
  //   icon: Installment,
  //   id: METHODS.INSTALLMENT,
  //   payoo: SUPPORTED_METHODS.INSTALLMENT_VALUE,
  // },
  // {
  //   title: 'Mua trước trả sau',
  //   icon: Cash_Payment,
  //   id: METHODS.INSTALLMENT,
  //   payoo: SUPPORTED_METHODS.INSTALLMENT_VALUE,
  // },
];

const Payment = () => {
  const route = useRoute();
  const {data, companyId, voucher} = route.params as any;

  return (
    <View
      data={data}
      voucher={voucher}
      companyId={companyId}
      dataPayment={DATA_METHOD_PAYMENT}
    />
  );
};

export default Payment;
