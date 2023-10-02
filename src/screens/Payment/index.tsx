import React from 'react';
import {useRoute} from '@react-navigation/native';
import {Atm, Cash_Payment, Credit, Installment} from '@utils/svg';
import View from './view';

const DATA_METHOD_PAYMENT = [
  {
    title: 'Thẻ ATM',
    icon: Atm,
    id: 3,
    payoo: 2,
  },
  {
    title: 'Thẻ credit (Visa, Master)',
    icon: Credit,
    id: 2,
    payoo: 2,
  },
  // {
  //   title: 'Trả góp qua thẻ tính dụng',
  //   icon: Installment,
  //   id: 6,
  //   payoo: 32,
  // },
  // {
  //   title: 'Mua trước trả sau',
  //   icon: Cash_Payment,
  //   id: 6,
  //   payoo: 32,
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
