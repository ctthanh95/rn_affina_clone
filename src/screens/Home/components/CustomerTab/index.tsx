import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getCustomerReport} from 'src/redux/sagas/report/getCustomerReport';
import {useAppDispatch} from '@hooks/redux';
import {getCustomerList} from 'src/redux/sagas/customer/getCustomerList';
import {updateCustomerSeenField} from 'src/redux/sagas/customer/updateCustomerSeenField';
import {navigate} from '@navigation/RootNavigation';
import {NEW_CUSTOMER} from '@navigation/screens';
import ViewCustomerTab from './ViewCustomerTab';

const checkUpdate = (status: number, customerReportData: any) => {
  return (
    (status === 1 && customerReportData?.isNewCustomer) ||
    (status === 2 && customerReportData?.isAccept) ||
    (status === 3 && customerReportData?.isWatching) ||
    (status === 4 && customerReportData?.isNotDemand)
  );
};

const CustomerTab = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(1);
  const [isSecondTime, setIsSecondTime] = useState(false);
  const [total, setTotal] = useState(0);
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
  const handleGetCustomList = () => {
    const options: any = {
      dataGet: {
        from: 0,
        limit: 10,
        order: 'modifiedAt',
        by: 'desc',
        status,
      },
      callbackSuccess: (data: any) => {
        setTotal(data.total);
        setCustomerListtData(data.list);
        setIsSecondTime(true);
      },
    };
    dispatch(getCustomerList(options));
  };

  useFocusEffect(
    useCallback(() => {
      handleGetCustomReport();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      handleGetCustomList();
    }, [status]),
  );

  return (
    <ViewCustomerTab
      customerReportData={customerReportData}
      status={status}
      onSetStatus={handleSetStatus}
      customerListtData={customerListtData}
      onCreateCustomer={handleCreateCustomer}
    />
  );
};

export default CustomerTab;

const styles = StyleSheet.create({});
