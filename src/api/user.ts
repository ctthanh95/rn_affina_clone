import {axiosGet, axiosPot, axiosPut} from './axios';

const PROFILE = '/user/sale/account/profile';

export const getSaleProfileApi = () => {
  return axiosGet(PROFILE);
};

export const updateSaleProfileApi = (data: any) => {
  return axiosPut(PROFILE, data);
};
