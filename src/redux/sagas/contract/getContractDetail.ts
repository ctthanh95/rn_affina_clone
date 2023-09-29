import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getContractDetailApi} from '@api/contract';

export const getContractDetail = createAction('GET_CONTRACT_DETAIL');

export function* getContractDetailSaga(options: any) {
  const {
    type,
    payload: {dataGet, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getContractDetailApi, dataGet);
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
