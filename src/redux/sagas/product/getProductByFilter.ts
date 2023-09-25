import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getProductByFilterApi} from '@api/product';

export const getProductByFilter = createAction('GET_PRODUCT_BY_FILTER');

export function* getProductByFilterSaga(options: any) {
  const {
    type,
    payload: {dataGet, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getProductByFilterApi, dataGet);
      switch (code) {
        case '200':
          const result = data.sort(
            (a: any, b: any) => b.listProduct.length - a.listProduct.length,
          );
          callbackSuccess(result);
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
