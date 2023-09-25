import React from 'react';
import View from './view';
import {useRoute} from '@react-navigation/native';
import {navigate} from '@navigation/RootNavigation';
import {RECEIVER} from '@navigation/screens';

const Buyer = () => {
  const route = useRoute();
  const params = route.params;
  const {cart, companyId} = params as any;
  const handleSubmit = (data: any) => {
    navigate(RECEIVER, {
      buyer: data,
      cart,
      companyId,
    });
  };
  return <View onSubmit={handleSubmit} />;
};

export default Buyer;
