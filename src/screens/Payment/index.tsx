import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch} from '@hooks/redux';
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
  {
    title: 'Trả góp qua thẻ tính dụng',
    icon: Installment,
    id: 6,
    payoo: 32,
  },
  {
    title: 'Mua trước trả sau',
    icon: Cash_Payment,
    id: 6,
    payoo: 32,
  },
];

const Payment = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const {data, companyId, voucher} = route.params as any;
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View
      companyId={companyId}
      data={data}
      dataPayment={DATA_METHOD_PAYMENT}
      isChecked={isChecked}
      onChecked={handleChecked}
    />
  );
};

export default Payment;
