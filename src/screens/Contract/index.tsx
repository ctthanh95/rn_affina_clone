import React, {useEffect, useRef, useState} from 'react';
import {isEmpty} from 'lodash';
import {useAppDispatch} from '@hooks/redux';
import {getContractList} from '@sagas/contract/getContractList';
import View from './view';

const Contract = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(3);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [keySearch, setKeySearch] = useState('');
  const flatlistRef: any = useRef();

  const lengthData = data.length;
  const lastItem: any = data[lengthData - 1];

  const handleStatus = (id: number) => {
    setStatus(id);
  };

  const handleDelete = () => {
    setKeySearch('');
    handleGetContractListDefault();
  };

  const onRefresh = () => {
    setRefreshing(true);
    setKeySearch('');
    handleGetContractListDefault();
  };

  const handleLoadMore = () => {
    const options: any = {
      dataDelete: {
        limit: 5,
        status: [status],
        searchId: keySearch,
        contractId: lastItem?.contractId || null,
        createdAt: lastItem?.createdAt || null,
      },
      isShowLoading: false,
      callbackSuccess: (res: any) => {
        const temp: any = [...data, ...res];
        setData(temp);
        console.log('handleLoadMore ');
      },
    };
    dispatch(getContractList(options));
  };

  const handleSearch = (search: string) => {
    const key = search.trim().toLowerCase();
    const isEmptyKeySearch = isEmpty(key);
    if (isEmptyKeySearch) {
      handleGetContractListDefault();
    } else {
      const options: any = {
        dataDelete: {
          limit: 5,
          status: [status],
          searchId: key,
          contractId: lastItem?.contractId || null,
          createdAt: lastItem?.createdAt || null,
        },
        isShowLoading: true,
        callbackSuccess: (data: any) => {
          setData(data);

          setKeySearch(key);
          console.log('handleSearch ');
        },
      };
      dispatch(getContractList(options));
    }
  };

  const handleGetContractListDefault = () => {
    const options: any = {
      dataDelete: {
        limit: 5,
        status: [status],
      },
      isShowLoading: true,
      callbackSuccess: (data: any) => {
        setData(data);
        setRefreshing(false);
        console.log('handleGetContractListDefault');
      },
    };
    dispatch(getContractList(options));
  };

  useEffect(() => {
    handleGetContractListDefault();
  }, [status]);

  return (
    <View
      data={data}
      refreshing={refreshing}
      onStatus={handleStatus}
      onRefresh={onRefresh}
      onLoadMore={handleLoadMore}
      onSearch={handleSearch}
      onDelete={handleDelete}
    />
  );
};

export default Contract;
