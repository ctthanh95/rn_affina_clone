import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getTopicApi} from '@api/news';

export const getTopic = createAction('GET_TOPIC');

export function* getTopicSaga(options: any) {
  const {
    type,
    payload: {dataDelete, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getTopicApi, dataDelete);
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
