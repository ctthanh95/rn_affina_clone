import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getIncomeReportApi} from '@api/report';

export const getIncomeReport = createAction('GET_INCOME_REPORT');

export function* getIncomeReportSaga(options: any) {
  const {
    type,
    payload: {dataPost, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getIncomeReportApi, dataPost);
      switch (code) {
        case '200':
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
