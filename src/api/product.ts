import {axiosGet, axiosPot, axiosPut} from './axios';

const PROGRAM = '/sale/sale/program';
const PRODUCT = '/sale/sale/product';
const PRODUCT_DETAIL = '/sale/sale/product/detail';

export const getProgramApi = () => {
  return axiosGet(PROGRAM);
};

export const getProductByFilterApi = (data: any) => {
  return axiosGet(PRODUCT, data);
};

export const getProductDetailApi = (data: any) => {
  return axiosGet(PRODUCT_DETAIL, data);
};
