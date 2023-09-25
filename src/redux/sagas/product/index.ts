import {all, takeLatest} from 'redux-saga/effects';
import {getProgram, getProgramSaga} from './getProgram';
import {getProductByFilter, getProductByFilterSaga} from './getProductByFilter';
import {getProductDetail, getProductDetailSaga} from './getProductDetail';

export function* productSaga() {
  yield all([takeLatest(getProgram, getProgramSaga)]);
  yield all([takeLatest(getProductByFilter, getProductByFilterSaga)]);
  yield all([takeLatest(getProductDetail, getProductDetailSaga)]);
}
