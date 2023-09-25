import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {getConfigApi} from '@api/config';
import {setDeeplink, setHostStaticResource} from '@slices/configSlice';
import {updateErrorSlice} from '@slices/errorSlice';

export const getConfig = createAction('GET_CONFIG');

type TItem = {
  keyName: string;
  value: string;
};

export function* getConfigSaga(options: any) {
  const {
    type,
    payload: {isShowLoading},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getConfigApi);
      switch (code) {
        case '200':
          let hostStaticResource = '';
          let deeplink = '';
          data.forEach((item: TItem) => {
            const keyName = item.keyName;
            const value = item.value;
            if (keyName === 'hostStaticResource') hostStaticResource = value;
            if (keyName === 'deeplink') deeplink = value;
          });
          yield put(setHostStaticResource(hostStaticResource));
          yield put(setDeeplink(deeplink));
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
