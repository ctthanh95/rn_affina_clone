import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getSaleProfileApi} from '@api/user';
import {signOut} from '../auth/signOut';
import {setUserData} from '@slices/authSlice';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const getSaleProfile = createAction('GET_SALE_PROFILE');

export function* getSaleProfileSaga(options: any) {
  const {type, payload} = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getSaleProfileApi);

      switch (code) {
        case '200':
          yield put(setUserData(data));
          break;
        case '4002':
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
