import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {createContractApi} from '@api/contract';

export const createContract = createAction('CREATE_CONTRACT');

export function* createContractSaga(options: any) {
  const {
    type,
    payload: {dataPost, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(createContractApi, dataPost);
      switch (code) {
        case '200':
          callbackSuccess(data);
          break;
        case 'AUTH_4001': {
          yield put(
            updateErrorSlice({
              title: 'Cảnh báo',
              content: 'Người được bảo hiểm không phù hợp với sản phẩm',
            }),
          );
          break;
        }
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
