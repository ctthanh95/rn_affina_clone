import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {createCustomerApi} from '@api/customer';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const createCustomer = createAction('CREATE_CUSTOMER');

export function* createCustomerSaga(options: any) {
  const {
    type,
    payload: {dataPost, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(createCustomerApi, dataPost);

      switch (code) {
        case '200':
          callbackSuccess();
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
