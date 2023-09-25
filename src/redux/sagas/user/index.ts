import {all, takeLatest} from 'redux-saga/effects';
import {getSaleProfile, getSaleProfileSaga} from './getSaleProfile';
import {updateSaleProfile, updateSaleProfileSaga} from './updateSaleProfile';

export function* userSaga() {
  yield all([takeLatest(getSaleProfile, getSaleProfileSaga)]);
  yield all([takeLatest(updateSaleProfile, updateSaleProfileSaga)]);
}
