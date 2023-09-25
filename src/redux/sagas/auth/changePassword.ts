import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import {changePasswordApi, forgetPasswordApi} from '@api/auth';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {signOut} from './signOut';
import {setUsername, signInSlice} from '@slices/authSlice';
import {storage} from '@utils/mmkv';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const changePassword = createAction('CHANGE_PASSWORD');

export function* changePasswordSaga(options: any) {
  const {
    payload: {dataPost, username, callbackSuccess},
    type,
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(changePasswordApi, dataPost);

      switch (code) {
        case '200':
          yield put(setUsername(username));
          callbackSuccess();
          break;
        case 'PASSWORD_4000':
          yield put(
            updateErrorSlice({
              title: 'Cảnh báo',
              content:
                'Phiên đăng nhập/đăng kí đã hết hạn. Vui lòng thử lại sau',
            }),
          );
          yield put(signOut());
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
    yield handleSaga(execution, type);
  } catch (error) {
    console.log('error,', error);
  }
}
