import {all, takeLatest} from 'redux-saga/effects';
import {getProductReport, getProductReportSaga} from './getProductReport';
import {getCustomerReport, getCustomerReportSaga} from './getCustomerReport';

export function* reportSaga() {
  yield all([takeLatest(getProductReport, getProductReportSaga)]);
  yield all([takeLatest(getCustomerReport, getCustomerReportSaga)]);
}
