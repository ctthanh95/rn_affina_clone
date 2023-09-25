import {axiosGet, axiosPot, axiosPut, axiosDelete} from './axios';

const TOPIC = '/other/sale/news/topic';
const NEWS = '/other/sale/news';
const COMMENT = '/other/sale/news/comment';

export const getTopicApi = (data: any) => {
  return axiosDelete(TOPIC, data);
};

export const getOutstandingNewsApi = (data: any) => {
  return axiosDelete(NEWS, data);
};

export const getNewsDetailApi = (data: any) => {
  return axiosGet(NEWS, data);
};

export const postCommentOnNewsApi = (data: any) => {
  return axiosPot(COMMENT, data);
};
