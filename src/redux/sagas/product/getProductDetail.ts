import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getProductDetailApi} from '@api/product';

export const getProductDetail = createAction('GET_PRODUCT_DETAIL');

export function* getProductDetailSaga(options: any) {
  const {
    type,
    payload: {dataGet, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getProductDetailApi, dataGet);
      switch (code) {
        case '200':
          callbackSuccess(data);
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
