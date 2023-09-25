import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import {checkPhoneLoginApi} from '@api/auth';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const checkPhoneLogin = createAction('CHECK_PHONE_LOGIN');

export function* checkPhoneLoginSaga(options: any) {
  const {
    payload: {phone, callbackLogin, callbackRegister},
    type,
  } = options;
  try {
    function* execution() {
      const {code, data, message} = yield call(checkPhoneLoginApi, phone);

      switch (code) {
        case '200':
          callbackLogin();
          break;
        case 'LOGIN_2001':
          const {otpKey, timeCodeExpire} = data;
          callbackRegister({otpKey, timeCodeExpire});
          break;
        case 'OTP_4004':
          yield put(
            updateErrorSlice({
              title: 'Cảnh báo',
              content:
                'Bạn đã nhập sai mã OTP quá số lần cho phép. Vui lòng thử lại sau 24h hoặc liên hệ với chúng tôi để được hỗ trợ.',
            }),
          );
          break;
        case 'LOGIN_4002':
          yield put(
            updateErrorSlice({
              title: 'Cảnh báo',
              content:
                'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với chúng tôi để được hỗ trợ.',
            }),
          );
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
