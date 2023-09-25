import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {getTemplateApi} from '@api/config';
import {setTemplate} from '@slices/configSlice';
import {updateErrorSlice} from '@slices/errorSlice';

export const getTemplate = createAction('GET_TEMPLATE');

type TItem = {
  keyName: string;
  value: string;
};

export function* getTemplateSaga(options: any) {
  const {type, payload} = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getTemplateApi, {appAgency: 1});
      switch (code) {
        case '200':
          yield put(setTemplate(data));

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
