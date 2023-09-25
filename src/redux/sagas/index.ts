import {all, fork} from 'redux-saga/effects';
import {authSaga} from './auth';
import {userSaga} from './user';
import {productSaga} from './product';
import {configSaga} from './config';
import {reportSaga} from './report';
import {customerSaga} from './customer';
import {contractSaga} from './contract';
import {newsSaga} from './news';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(configSaga),
    fork(productSaga),
    fork(reportSaga),
    fork(customerSaga),
    fork(contractSaga),
    fork(newsSaga),
  ]);
}
