import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {uploadImageApi} from '@api/config';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const uploadImage = createAction('UPLOAD_IMAGE');

export function* uploadImageSaga(options: any) {
  const {
    type,
    payload: {callbackSuceess, dataPost},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(uploadImageApi, dataPost);

      switch (code) {
        case '200':
          callbackSuceess(data);
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
