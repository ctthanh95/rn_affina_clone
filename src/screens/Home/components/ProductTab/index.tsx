import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {getProgram} from 'src/redux/sagas/product/getProgram';
import {getTemplate} from 'src/redux/sagas/config/getTemplate';
import {selectListGroupProgram} from '@slices/configSlice';
import {selectProgram} from '@slices/productSlice';
import {getProductReport} from 'src/redux/sagas/report/getProductReport';
import {getTime} from '@utils/global';
import ViewProductTab from './ViewProductTab';

const ProductTab = () => {
  const dispatch = useAppDispatch();
  const listGroupProgram = useAppSelector(selectListGroupProgram);
  const program = useAppSelector(selectProgram);
  const [date, setDate] = useState(new Date());
  const [productReportData, setProductReportData] = useState({});

  const lengthListGroupProgram = listGroupProgram.length;
  const lengthProgram = program.length;

  useEffect(() => {
    if (!lengthListGroupProgram) {
      const options: any = {};
      dispatch(getTemplate(options));
    }
  }, []);

  useEffect(() => {
    if (!lengthProgram) {
      const options: any = {};
      dispatch(getProgram(options));
    }
  }, []);

  useEffect(() => {
    const month = getTime(date, 'month');
    const year = getTime(date, 'year');
    const compareMonth = month >= 2 ? month - 1 : 12;
    const compareYear = month >= 2 ? year : year - 1;
    const options: any = {
      dataGet: {
        month,
        year,
        compareMonth,
        compareYear,
      },
      callbackSuccess: (data: any) => {
        setProductReportData(data);
      },
    };
    dispatch(getProductReport(options));
  }, [date]);

  return (
    <ViewProductTab
      data={program}
      date={date}
      setDate={setDate}
      productReportData={productReportData}
    />
  );
};

export default ProductTab;

const styles = StyleSheet.create({});
