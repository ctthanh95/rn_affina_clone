import {all, takeLatest} from 'redux-saga/effects';
import {getProductReport, getProductReportSaga} from './getProductReport';
import {getCustomerReport, getCustomerReportSaga} from './getCustomerReport';
import {getContractReport, getContractReportSaga} from './getContractReport';
import {getIncomeReport, getIncomeReportSaga} from './getIncomeReport';

export function* reportSaga() {
  yield all([takeLatest(getProductReport, getProductReportSaga)]);
  yield all([takeLatest(getCustomerReport, getCustomerReportSaga)]);
  yield all([takeLatest(getContractReport, getContractReportSaga)]);
  yield all([takeLatest(getIncomeReport, getIncomeReportSaga)]);
}
