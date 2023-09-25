import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {updateCustomerApi} from '@api/customer';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const updateCustomer = createAction('UPDATE_CUSTOMER');

export function* updateCustomerSaga(options: any) {
  const {
    type,
    payload: {dataPut, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(updateCustomerApi, dataPut);

      switch (code) {
        case '200':
          if (callbackSuccess) callbackSuccess();
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
