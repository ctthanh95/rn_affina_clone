import {axiosGet, axiosPot, axiosPut} from './axios';
const CUSTOMER = '/user/sale/lead';
const UPDATE_CUSTOMER = '/user/sale/lead/sale';
const DETAIL_CUSTOMER = '/user/sale/lead/detail';

export const getCustomerListApi = (data: any) => {
  return axiosGet(CUSTOMER, data);
};
export const updateCustomerSeenFieldApi = (data: any) => {
  return axiosPut(UPDATE_CUSTOMER, data);
};
export const getCustomerDetailApi = (data: any) => {
  return axiosGet(DETAIL_CUSTOMER, data);
};
export const updateCustomerApi = (data: any) => {
  return axiosPut(CUSTOMER, data);
};
export const createCustomerApi = (data: any) => {
  return axiosPot(CUSTOMER, data);
};
