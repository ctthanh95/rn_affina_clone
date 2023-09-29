import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {updateContractInfoApi} from '@api/contract';

export const updateContractInfo = createAction('UPDATE_CONTRACT_INFO');

export function* updateContractInfoSaga(options: any) {
  const {
    type,
    payload: {dataPut, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(updateContractInfoApi, dataPut);
      console.log(code, data);
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
