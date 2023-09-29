import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getContractListApi} from '@api/contract';

export const getContractList = createAction('GET_CONTRACT_LIST');

export function* getContractListSaga(options: any) {
  const {
    type,
    payload: {dataDelete, callbackSuccess, isShowLoading = true},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getContractListApi, dataDelete);
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
