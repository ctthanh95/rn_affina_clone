import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {updateSaleProfileApi} from '@api/user';

export const updateSaleProfile = createAction('UPDATE_SALE_PROFILE');

export function* updateSaleProfileSaga(options: any) {
  const {
    type,
    payload: {dataPut, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(updateSaleProfileApi, dataPut);
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
