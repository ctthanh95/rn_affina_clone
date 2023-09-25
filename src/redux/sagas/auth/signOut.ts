import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import {signOutApi} from '@api/auth';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {signOutSlice} from '@slices/authSlice';
import {storage} from '@utils/mmkv';
import {replace} from '@navigation/RootNavigation';
import {PUBLIC_STACK} from '@navigation/screens';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const signOut = createAction('SIGN_OUT');

export function* signOutSaga(options: any) {
  try {
    function* execution() {
      const {code, message} = yield call(signOutApi);

      switch (code) {
        case '200':
          yield put(signOutSlice());
          storage.delete('token');
          replace(PUBLIC_STACK);
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
    yield handleSaga(execution);
  } catch (error) {
    console.log('error,', error);
  }
}
