import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getCompanyProviderApi} from '@api/config';

export const getCompanyProvider = createAction('GET_COMPANY_PROVIDER');

export function* getCompanyProviderSaga(options: any) {
  const {
    type,
    payload: {callbackSuccess, dataPost},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getCompanyProviderApi, dataPost);
      switch (code) {
        case '200':
          const result = data.filter((item: any) => item.numberPackage > 0);
          callbackSuccess(result);
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
