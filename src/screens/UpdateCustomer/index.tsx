import React from 'react';
import View from './view';
import {useAppDispatch} from '@hooks/redux';
import {goBack} from '@navigation/RootNavigation';
import {useRoute} from '@react-navigation/native';
import {updateCustomer} from 'src/redux/sagas/customer/updateCustomer';

const UpdateCustomer = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const {data} = route.params as any;

  const hanldeUpdateCustomer = (dataPut: any) => {
    const options: any = {
      dataPut,
      callbackSuccess: (data: any) => {
        goBack();
      },
    };
    dispatch(updateCustomer(options));
  };

  return <View onSubmit={hanldeUpdateCustomer} data={data} />;
};

export default UpdateCustomer;
