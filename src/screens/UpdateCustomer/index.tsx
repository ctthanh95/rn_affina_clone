import React from 'react';
import Toast from 'react-native-toast-message';
import {useAppDispatch} from '@hooks/redux';
import {goBack} from '@navigation/RootNavigation';
import {useRoute} from '@react-navigation/native';
import {updateCustomer} from 'src/redux/sagas/customer/updateCustomer';
import View from './view';

const UpdateCustomer = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const {data} = route.params as any;

  const hanldeUpdateCustomer = (dataPut: any) => {
    const options: any = {
      dataPut,
      callbackSuccess: (data: any) => {
        Toast.show({
          type: 'success',
          props: {
            message: 'Cập nhật thông tin thành công!',
          },
        });
        goBack();
      },
    };
    dispatch(updateCustomer(options));
  };

  return <View onSubmit={hanldeUpdateCustomer} data={data} />;
};

export default UpdateCustomer;
