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

  const handleBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  useEffect(() => {
    const options: any = {
      callbackSuccess: (data: any) => {
        setDataContract(data);
      },
    };
    dispatch(getContractReport(options));
  }, []);

  useEffect(() => {
    const options: any = {
      dataPost: {
        fromDate: moment().startOf('month').valueOf(),
        toDate: moment().valueOf(),
        providerId: null,
        programType: null,
        cityCode: null,
      },
      callbackSuccess: (data: any) => {
        const {list, totalBonus} = data;
        setDataIncome(list);
        setTotalBonus(totalBonus);
      },
    };
    dispatch(getIncomeReport(options));
  }, []);
  return (
    <View
      dataIncome={dataIncome}
      totalBonus={totalBonus}
      dataContract={dataContract}
      introduceCode={introduceCode}
      bottomSheetRef={bottomSheetRef}
      onBottomSheet={handleBottomSheet}
      setIntroduceCode={setIntroduceCode}
    />
  );
};

export default Dashboard;
