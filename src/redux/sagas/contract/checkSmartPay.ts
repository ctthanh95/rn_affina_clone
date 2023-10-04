import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {checkSmartPayApi} from '@api/contract';

export const checkSmartPay = createAction('CHECK_SMARTPAY');

export function* checkSmartPaySaga(options: any) {
  const {
    type,
    payload: {dataPost, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(checkSmartPayApi, dataPost);
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
    yield handleSaga(execution, type, false);
  } catch (error) {
    console.log('error,', error);
  }
}
