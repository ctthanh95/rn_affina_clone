import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import {forgetPasswordApi} from '@api/auth';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {signOut} from './signOut';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const forgetPassword = createAction('FORGET_PASSWORD');

export function* forgetPasswordSaga(options: any) {
  const {
    payload: {phone, callbackSuccess},
    type,
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(forgetPasswordApi, phone);

      switch (code) {
        case '200':
          const {otpKey, timeCodeExpire} = data;
          callbackSuccess({otpKey, timeCodeExpire});
          break;
        case 'OTP_4004':
          yield put(
            updateErrorSlice({
              title: 'Cảnh báo',
              content:
                'Đã vượt quá số lần thử. Vui lòng thử lại bằng tài khoản khác',
            }),
          );
          yield put(signOut());
          break;
        // case 'COMMON_4000':
        //   yield put(
        //     updateErrorSlice({
        //       title: 'Lỗi',
        //       content: message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau',
        //     }),
        //   );
        //   break;
        // case 'AUTH_4001':
        //   yield put(
        //     updateErrorSlice({
        //       title: 'Lỗi',
        //       content: message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau',
        //     }),
        //   );
        //   break;
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
