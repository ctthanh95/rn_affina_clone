import {all, takeLatest} from 'redux-saga/effects';
import {getTerms, getTermsSaga} from './getTerms';
import {createContract, createContractSaga} from './createContract';

export function* contractSaga() {
  yield all([takeLatest(getTerms, getTermsSaga)]);
  yield all([takeLatest(createContract, createContractSaga)]);
}
