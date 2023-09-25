import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getOutstandingNewsApi} from '@api/news';

export const getOutstandingNews = createAction('GET_OUTSTANDING_NEWS');

export function* getOutstandingNewsSaga(options: any) {
  const {
    type,
    payload: {dataDelete, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(
        getOutstandingNewsApi,
        dataDelete,
      );
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
