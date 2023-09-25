import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getWardApi} from '@api/config';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const getWard = createAction('GET_WARD');

export function* getWardSaga(options: any) {
  const {
    type,
    payload: {callbackSuccess, dataGet},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getWardApi, dataGet);

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
