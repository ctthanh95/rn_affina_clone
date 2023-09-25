import {selectContentError, showErrorSlice} from './../slices/errorSlice';
import {selectIsConnected} from '@slices/connectSlice';
import {startCallApiSlice, finishCallApiSlice} from '@slices/loadingSlice';
import {delay, put, select} from 'redux-saga/effects';
import {isEmpty} from 'lodash';

function* handleSaga(execution: any, type?: string, isShowLoading = true): any {
  try {
    const isConnected = yield select(selectIsConnected);
    if (!isConnected) {
      return;
    }
    if (isShowLoading) {
      yield put(startCallApiSlice());
    }
    yield* execution();
    yield delay(200);
    if (isShowLoading) {
      yield put(finishCallApiSlice());
    }
    const contentError = yield select(selectContentError);
    if (!isEmpty(contentError)) {
      yield put(showErrorSlice());
    }
  } catch (e) {
    console.log('handleSaga', e);
  }
}

export default handleSaga;
