import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {updateCustomerSeenFieldApi} from '@api/customer';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const updateCustomerSeenField = createAction(
  'UPDATE_CUSTOMER_SEEN_FIELD',
);

export function* updateCustomerSeenFieldSaga(options: any) {
  const {
    type,
    payload: {dataPut, isShowLoading, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(
        updateCustomerSeenFieldApi,
        dataPut,
      );
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
    yield handleSaga(execution, type, isShowLoading);
  } catch (error) {
    console.log('error,', error);
  }
}
