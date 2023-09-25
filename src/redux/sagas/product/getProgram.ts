import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getProgramApi} from '@api/product';
import {setProgram} from '@slices/productSlice';
import {finishCallApiSlice} from '@slices/loadingSlice';

export const getProgram = createAction('GET_PROGRAM');

export function* getProgramSaga(options: any) {
  const {type, payload} = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getProgramApi);

      switch (code) {
        case '200':
          const result = data.filter(
            (item: any) => item.programList.length > 0,
          );
          yield put(setProgram(result));
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
