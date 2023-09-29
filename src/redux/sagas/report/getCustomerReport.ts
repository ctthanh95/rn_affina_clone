import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getCustomerReportApi} from '@api/report';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const getCustomerReport = createAction('GET_CUSTOMER_REPORT');

export function* getCustomerReportSaga(options: any) {
  const {
    type,
    payload: {dataPost, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getCustomerReportApi, dataPost);
      switch (code) {
        case '200':
          // let temp = {
          //   people: 27,
          //   assets: 44,
          //   travel: 39,
          //   other: 56,
          //   prevRevenue: 136,
          //   totalRevenue: 166,
          // };
          callbackSuccess(data);
          break;
        default:
          yield put(
            updateErrorSlice({
              title: 'Lỗi',
              content: message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau',
            }),
          );
          break;
      }
    }
    yield handleSaga(execution, type);
  } catch (error) {
    console.log('error,', error);
  }
}
