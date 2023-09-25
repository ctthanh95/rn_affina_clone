import {all, takeLatest} from 'redux-saga/effects';
import {getTopic, getTopicSaga} from './getTopic';
import {getOutstandingNews, getOutstandingNewsSaga} from './getOutstandingNews';
import {getNewsDetail, getNewsDetailSaga} from './getNewsDetail';
import {postCommentOnNews, postCommentOnNewsSaga} from './postCommentOnNews';

export function* newsSaga() {
  yield all([takeLatest(getTopic, getTopicSaga)]);
  yield all([takeLatest(getOutstandingNews, getOutstandingNewsSaga)]);
  yield all([takeLatest(getNewsDetail, getNewsDetailSaga)]);
  yield all([takeLatest(postCommentOnNews, postCommentOnNewsSaga)]);
}
