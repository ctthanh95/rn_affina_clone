import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import View from './view';
import {useAppDispatch} from '@hooks/redux';
import {getContractDetail} from '@sagas/contract/getContractDetail';
import {updateContractInfo} from '@sagas/contract/updateContractInfo';

const DetailContract = () => {
  const routes = useRoute();
  const dispatch = useAppDispatch();
  const {contractId} = routes.params as any;
  const [data, setData] = useState({});

  const handleUpdateContractInfo = (data: any) => {
    const options: any = {
      dataPut: data,
      callbackSuccess: (data: any) => {},
    };
    dispatch(updateContractInfo(options));
  };

  useEffect(() => {
    const options: any = {
      dataGet: {
        contractId,
      },
      callbackSuccess: (data: any) => {
        setData(data);
      },
    };
    dispatch(getContractDetail(options));
  }, []);

  return (
    <View
      contractId={contractId}
      data={data}
      onUpdateContractInfo={handleUpdateContractInfo}
    />
  );
};

export default DetailContract;
