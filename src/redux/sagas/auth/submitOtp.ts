import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import {submitOtpApi} from '@api/auth';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const submitOtp = createAction('SUBMIT_OTP');

export function* submitOtpSaga(options: any) {
  const {
    payload: {dataPut, callbackSuccess},
    type,
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(submitOtpApi, dataPut);

      switch (code) {
        case '200':
          callbackSuccess(data.token);
          break;
        case 'OTP_4000':
          yield put(
            updateErrorSlice({
              title: 'Cảnh báo',
              content: 'Mã otp không đúng',
            }),
          );
          break;
        case 'OTP_4001':
          yield put(
            updateErrorSlice({
              title: 'Cảnh báo',
              content: 'OTP đã quá hạn. Vui lòng thử lại bằng OTP khác',
            }),
          );
          break;
        // case 'OTP_4002':
        //   yield put(
        //     updateErrorSlice({
        //       title: 'Lỗi',
        //       content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau',
        //     }),
        //   );
        //   break;
        case 'OTP_4003':
          yield put(
            updateErrorSlice({
              title: 'Cảnh báo',
              content:
                'Bạn đã vượt quá số lần cho phép. Vui lòng thử lại bằng tài khoản khác',
            }),
          );
          break;
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
