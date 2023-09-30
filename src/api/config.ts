import {axiosFormData, axiosGet, axiosPot, axiosPut} from './axios';

const CONFIG = '/user/config';
const TEMPLATE = '/other/public/setupTemplateImage';
const CITY = '/other/public/city';
const DISTRICT = '/other/public/district';
const WARD = '/other/public/ward';
const UPLOAD = '/other/public/upload';
const COMPANY_PROVIDER = '/user/public/company/provider';

export const getConfigApi = () => {
  return axiosGet(CONFIG);
};

export const getTemplateApi = (data: any) => {
  return axiosGet(TEMPLATE, data);
};

export const getCityApi = () => {
  return axiosGet(CITY);
};

export const getDistrictApi = (data: any) => {
  return axiosGet(DISTRICT, data);
};

export const getWardApi = (data: any) => {
  return axiosGet(WARD, data);
};

export const uploadImageApi = (data: any) => {
  return axiosFormData(UPLOAD, data);
};

export const getCompanyProviderApi = (data: any) => {
  return axiosPot(COMPANY_PROVIDER, data);
};
