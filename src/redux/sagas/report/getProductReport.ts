import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getProductReportApi} from '@api/report';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const getProductReport = createAction('GET_PRODUCT_REPORT');

export function* getProductReportSaga(options: any) {
  const {
    type,
    payload: {dataGet, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getProductReportApi, dataGet);

      switch (code) {
        case '200':
          let temp = {
            people: 27,
            assets: 44,
            travel: 39,
            other: 56,
            prevRevenue: 136,
            totalRevenue: 166,
          };
          callbackSuccess(dataGet.month === 9 ? data : temp);
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
