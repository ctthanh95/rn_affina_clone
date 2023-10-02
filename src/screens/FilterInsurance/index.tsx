import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch} from '@hooks/redux';
import {navigate} from '@navigation/RootNavigation';
import {PRODUCT} from '@navigation/screens';
import {getProductByFilter} from '@sagas/product/getProductByFilter';
import View from './view';

const FilterInsurance = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const {item, type, dataContract} = route.params as any;
  const handleSubmit = (formData: any) => {
    const {dob, gender} = formData;
    const options: any = {
      dataGet: {
        groupName: item?.groupName,
        dob,
        gender,
      },
      callbackSuccess: (data: any) => {
        navigate(PRODUCT, {
          data,
          dob,
          item,
          gender,
          type,
          dataContract,
          // typeBuyer: params?.typeBuyer || null,
          // infoBuyerAndInsuredPerson: params?.infoBuyerAndInsuredPerson || null,
          // fromLead: params?.fromLead || null
        });
      },
    };
    dispatch(getProductByFilter(options));
  };
  return <View onSubmit={handleSubmit} />;
};

export default FilterInsurance;
