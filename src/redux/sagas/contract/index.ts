import {all, takeLatest} from 'redux-saga/effects';
import {getTerms, getTermsSaga} from './getTerms';
import {createContract, createContractSaga} from './createContract';
import {getContractList, getContractListSaga} from './getContractList';
import {updateContractInfo, updateContractInfoSaga} from './updateContractInfo';
import {getContractDetail, getContractDetailSaga} from './getContractDetail';

export function* contractSaga() {
  yield all([takeLatest(getTerms, getTermsSaga)]);
  yield all([takeLatest(createContract, createContractSaga)]);
  yield all([takeLatest(getContractList, getContractListSaga)]);
  yield all([takeLatest(updateContractInfo, updateContractInfoSaga)]);
  yield all([takeLatest(getContractDetail, getContractDetailSaga)]);
}
