import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getCustomerReport} from 'src/redux/sagas/report/getCustomerReport';
import {useAppDispatch} from '@hooks/redux';
import {getCustomerList} from 'src/redux/sagas/customer/getCustomerList';
import {updateCustomerSeenField} from 'src/redux/sagas/customer/updateCustomerSeenField';
import {navigate} from '@navigation/RootNavigation';
import {NEW_CUSTOMER} from '@navigation/screens';
import View from './View';

type Props = {
  isEndReached: boolean;
  setIsEndReached: (value: boolean) => void;
};

const LIMIT = 10;

const checkUpdate = (status: number, customerReportData: any) => {
  return (
    (status === 1 && customerReportData?.isNewCustomer) ||
    (status === 2 && customerReportData?.isAccept) ||
    (status === 3 && customerReportData?.isWatching) ||
    (status === 4 && customerReportData?.isNotDemand)
  );
};

const CustomerTab = ({isEndReached, setIsEndReached}: Props) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(1);
  const [total, setTotal] = useState(0);
  const [from, setFrom] = useState(0);
  const [isSecondTime, setIsSecondTime] = useState(false);
  const [keySearch, setKeySearch] = useState('');
  const [customerListtData, setCustomerListtData] = useState([]);
  const [customerReportData, setCustomerReportData] = useState({});

  const handleSetStatus = (status: number) => {
    setStatus(status);
    if (isSecondTime) {
      const isHaveToUpdate = checkUpdate(status, customerReportData);
      if (isHaveToUpdate) {
        const options: any = {
          dataPut: {
            status,
          },
          isShowLoading: false,
          callbackSuccess: () => {
            handleGetCustomReport();
          },
        };
        dispatch(updateCustomerSeenField(options));
      }
    }
  };

  const handleCreateCustomer = () => {
    navigate(NEW_CUSTOMER);
  };

  const handleGetCustomReport = () => {
    const options: any = {
      dataPost: {},
      callbackSuccess: (data: any) => {
        setCustomerReportData(data);
      },
    };
    dispatch(getCustomerReport(options));
  };

  const handleGetCustomListDefault = () => {
    const options: any = {
      dataGet: {
        from: 0,
        limit: LIMIT,
        order: 'modifiedAt',
        by: 'desc',
        status,
      },
      callbackSuccess: (data: any) => {
        setTotal(data.total);
        setCustomerListtData(data.list);
        setIsSecondTime(true);
        setFrom(0);
      },
    };
    dispatch(getCustomerList(options));
  };

  const handleSearch = (key: string) => {
    const options: any = {
      dataGet: {
        from: 0,
        limit: LIMIT,
        order: 'modifiedAt',
        by: 'desc',
        status,
        search: 'lead.name',
        searchValue: key,
      },
      callbackSuccess: (data: any) => {
        setTotal(data.total);
        setCustomerListtData(data.list);
        setFrom(0);
        setKeySearch(key);
      },
    };
    dispatch(getCustomerList(options));
  };

  const handleLoadMore = () => {
    const lengthCustomerListtData = customerListtData.length;
    if (lengthCustomerListtData < total) {
      const step = from + LIMIT;
      const searchValue = keySearch ? keySearch : '';
      const options: any = {
        dataGet: {
          from: step,
          limit: LIMIT,
          order: 'modifiedAt',
          by: 'desc',
          status,
          search: 'lead.name',
          searchValue,
        },
        isShowLoading: false,
        callbackSuccess: (data: any) => {
          const newCustomerList = data?.list || [];
          const temp: any = [...customerListtData, ...newCustomerList];
          setCustomerListtData(temp);
          setFrom(step);
        },
      };
      dispatch(getCustomerList(options));
    }
  };

  const handleDelete = () => {
    handleGetCustomListDefault();
    setKeySearch('');
  };

  useEffect(() => {
    if (isEndReached) {
      handleLoadMore();
      setIsEndReached(false);
    }
  }, [isEndReached]);

  useFocusEffect(
    useCallback(() => {
      handleGetCustomReport();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      handleGetCustomListDefault();
    }, [status]),
  );

  return (
    <View
      status={status}
      customerReportData={customerReportData}
      customerListtData={customerListtData}
      onSetStatus={handleSetStatus}
      onCreateCustomer={handleCreateCustomer}
      onSearch={handleSearch}
      onDelete={handleDelete}
    />
  );
};

export default CustomerTab;
