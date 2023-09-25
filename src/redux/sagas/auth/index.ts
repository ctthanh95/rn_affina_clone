import {all, takeLatest} from 'redux-saga/effects';
import {checkPhoneLogin, checkPhoneLoginSaga} from './checkPhoneLogin';
import {signIn, signInSaga} from './signIn';
import {signOut, signOutSaga} from './signOut';
import {submitOtp, submitOtpSaga} from './submitOtp';
import {forgetPassword, forgetPasswordSaga} from './forgetPassword';
import {changePassword, changePasswordSaga} from './changePassword';

export function* authSaga() {
  yield all([takeLatest(checkPhoneLogin, checkPhoneLoginSaga)]);
  yield all([takeLatest(signIn, signInSaga)]);
  yield all([takeLatest(signOut, signOutSaga)]);
  yield all([takeLatest(submitOtp, submitOtpSaga)]);
  yield all([takeLatest(forgetPassword, forgetPasswordSaga)]);
  yield all([takeLatest(changePassword, changePasswordSaga)]);
}
