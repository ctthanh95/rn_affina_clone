import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getDistrictApi} from '@api/config';

export const getDistrict = createAction('GET_DISTRICT');

export function* getDistrictSaga(options: any) {
  const {
    type,
    payload: {callbackSuccess, dataGet},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getDistrictApi, dataGet);

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
    yield handleSaga(execution, type, false);
  } catch (error) {
    console.log('error,', error);
  }
}
