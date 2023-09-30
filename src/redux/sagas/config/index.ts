import {all, takeLatest} from 'redux-saga/effects';
import {getConfig, getConfigSaga} from './getConfig';
import {getTemplate, getTemplateSaga} from './getTemplate';
import {getCity, getCitySaga} from './getCity';
import {getDistrict, getDistrictSaga} from './getDistrict';
import {getWard, getWardSaga} from './getWard';
import {uploadImage, uploadImageSaga} from './uploadImage';
import {getCompanyProvider, getCompanyProviderSaga} from './getCompanyProvider';

export function* configSaga() {
  yield all([takeLatest(getConfig, getConfigSaga)]);
  yield all([takeLatest(getTemplate, getTemplateSaga)]);
  yield all([takeLatest(getCity, getCitySaga)]);
  yield all([takeLatest(getDistrict, getDistrictSaga)]);
  yield all([takeLatest(getWard, getWardSaga)]);
  yield all([takeLatest(uploadImage, uploadImageSaga)]);
  yield all([takeLatest(getCompanyProvider, getCompanyProviderSaga)]);
}
