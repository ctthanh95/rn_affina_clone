import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getCityApi} from '@api/config';
import {setListCity} from '@slices/configSlice';

export const getCity = createAction('GET_CITY');

export function* getCitySaga(options: any) {
  const {
    type,
    payload: {isShowLoading},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getCityApi);
      switch (code) {
        case '200':
          yield put(setListCity(data));
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
    yield handleSaga(execution, type, isShowLoading);
  } catch (error) {
    console.log('error,', error);
  }
}
