import {all, takeLatest} from 'redux-saga/effects';
import {getCustomerList, getCustomerListSaga} from './getCustomerList';
import {getCustomerDetail, getCustomerDetailSaga} from './getCustomerDetail';
import {updateCustomer, updateCustomerSaga} from './updateCustomer';
import {createCustomer, createCustomerSaga} from './createCustomer';
import {
  updateCustomerSeenField,
  updateCustomerSeenFieldSaga,
} from './updateCustomerSeenField';

export function* customerSaga() {
  yield all([takeLatest(getCustomerList, getCustomerListSaga)]);
  yield all([takeLatest(updateCustomerSeenField, updateCustomerSeenFieldSaga)]);
  yield all([takeLatest(getCustomerDetail, getCustomerDetailSaga)]);
  yield all([takeLatest(updateCustomer, updateCustomerSaga)]);
  yield all([takeLatest(createCustomer, createCustomerSaga)]);
}
