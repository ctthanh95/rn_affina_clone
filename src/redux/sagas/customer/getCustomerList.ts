import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getCustomerListApi} from '@api/customer';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const getCustomerList = createAction('GET_CUSTOM_LIST');

export function* getCustomerListSaga(options: any) {
  const {
    type,
    payload: {dataGet, callbackSuccess, isShowLoading = true},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getCustomerListApi, dataGet);
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
    yield handleSaga(execution, type, isShowLoading);
  } catch (error) {
    console.log('error,', error);
  }
}
