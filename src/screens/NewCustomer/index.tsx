import React from 'react';
import View from './view';
import {useAppDispatch} from '@hooks/redux';
import {goBack} from '@navigation/RootNavigation';
import {createCustomer} from 'src/redux/sagas/customer/createCustomer';

const NewCustomer = () => {
  const dispatch = useAppDispatch();

  const handleCreateCustomer = (dataPost: any) => {
    const options: any = {
      dataPost,
      callbackSuccess: () => {
        goBack();
      },
    };
    dispatch(createCustomer(options));
  };

  return <View onSubmit={handleCreateCustomer} />;
};

export default NewCustomer;
