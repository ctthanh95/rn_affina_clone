import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getCustomerDetailApi} from '@api/customer';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const getCustomerDetail = createAction('GET_CUSTOMER_DETAIL');

export function* getCustomerDetailSaga(options: any) {
  const {
    type,
    payload: {dataGet, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getCustomerDetailApi, dataGet);

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
