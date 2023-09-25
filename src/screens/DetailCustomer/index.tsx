import React, {useCallback, useState} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useAppDispatch} from '@hooks/redux';
import {getCustomerDetail} from 'src/redux/sagas/customer/getCustomerDetail';
import {updateCustomer} from 'src/redux/sagas/customer/updateCustomer';
import {navigate} from '@navigation/RootNavigation';
import {UPDATE_CUSTOMER} from '@navigation/screens';
import View from './view';

const DetailCustomer = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const [data, setData] = useState({});
  const [status, setStatus] = useState(0);
  const {id} = route.params as any;

  const hanldeUpdateStatus = (value: number) => {
    const temp = {...data, status: value};
    const options: any = {
      dataPut: temp,
      // callbackSuccess: (data: any) => {
      //   setData(data);
      // },
    };
    setStatus(value);
    dispatch(updateCustomer(options));
  };

  const handleUpdateCustomer = () => {
    navigate(UPDATE_CUSTOMER, {
      data,
    });
  };

  const hanleGetCustomerDetail = () => {
    const options: any = {
      dataGet: {id},
      callbackSuccess: (data: any) => {
        setData(data);
        setStatus(data.status);
      },
    };
    dispatch(getCustomerDetail(options));
  };

  useFocusEffect(
    useCallback(() => {
      hanleGetCustomerDetail();
    }, []),
  );

  return (
    <View
      data={data}
      status={status}
      onUpdateStatus={hanldeUpdateStatus}
      onUpdateCustomer={handleUpdateCustomer}
    />
  );
};

export default DetailCustomer;
