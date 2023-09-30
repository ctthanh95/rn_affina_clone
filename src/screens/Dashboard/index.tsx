import React, {useCallback, useEffect, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import moment from 'moment';
import {useAppDispatch} from '@hooks/redux';
import {getContractReport} from '@sagas/report/getContractReport';
import {getIncomeReport} from '@sagas/report/getIncomeReport';
import View from './view';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [introduceCode, setIntroduceCode] = useState('');
  const [dataContract, setDataContract] = useState([]);
  const [dataIncome, setDataIncome] = useState(null);
  const [totalBonus, setTotalBonus] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const handelToggleModal = () => {
    setModalVisible(pre => !pre);
  };

  const handleBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handleGetIncomeReport = (dataPost: any) => {
    const options: any = {
      dataPost,
      callbackSuccess: (data: any) => {
        const {list, totalBonus} = data;
        setDataIncome(list);
        setTotalBonus(totalBonus);
      },
    };
    dispatch(getIncomeReport(options));
  };

  useEffect(() => {
    const options: any = {
      callbackSuccess: (data: any) => {
        setDataContract(data);
      },
    };
    dispatch(getContractReport(options));
  }, []);

  useEffect(() => {
    const dataPost = {
      fromDate: moment().startOf('month').valueOf(),
      toDate: moment().valueOf(),
      providerId: null,
      programType: null,
      cityCode: null,
    };
    handleGetIncomeReport(dataPost);
  }, []);
  return (
    <View
      dataIncome={dataIncome}
      totalBonus={totalBonus}
      dataContract={dataContract}
      introduceCode={introduceCode}
      bottomSheetRef={bottomSheetRef}
      isModalVisible={isModalVisible}
      onToggleModal={handelToggleModal}
      onBottomSheet={handleBottomSheet}
      setIntroduceCode={setIntroduceCode}
      onGetIncomeReport={handleGetIncomeReport}
    />
  );
};

export default Dashboard;
