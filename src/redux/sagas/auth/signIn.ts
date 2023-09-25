import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import {signInApi} from '@api/auth';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {signInSlice} from '@slices/authSlice';
import {storage} from '@utils/mmkv';

import {signOut} from './signOut';
import {getSaleProfile} from '../user/getSaleProfile';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const signIn = createAction('SIGN_IN');

export function* signInSaga(options: any) {
  const {
    payload: {dataPost, callbackResetCode, callbackSuccess},
    type,
  } = options;

  try {
    function* execution() {
      const {code, data, message} = yield call(signInApi, dataPost);

      switch (code) {
        case '200':
          yield put(
            signInSlice({...data, username: data.profileDetails.cusName}),
          );
          storage.set('token', data.token);
          yield put(getSaleProfile());
          callbackSuccess();
          break;
        case 'LOGIN_4000':
          yield put(
            updateErrorSlice({
              title: 'Cảnh báo',
              content: 'Thông tin đã nhập không đúng. Vui lòng kiểm tra lại',
            }),
          );
          callbackResetCode();
          break;
        case 'AUTH_4001':
          yield put(
            updateErrorSlice({
              title: 'Lỗi',
              content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau',
            }),
          );
          yield put(signOut());
          break;
        case 'LOGIN_4002':
          yield put(
            updateErrorSlice({
              title: 'Cảnh báo',
              content:
                'Tài khoản đã bị khoá. Vui lòng thử lại bằng tài khoản khác',
            }),
          );
          yield put(signOut());
          break;
        case 'LOGIN_4003':
          yield put(
            updateErrorSlice({
              title: 'Cảnh báo',
              content:
                'Tài khoản chưa được duyệt. Vui lòng thử lại bằng tài khoản khác',
            }),
          );
          yield put(signOut());
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
