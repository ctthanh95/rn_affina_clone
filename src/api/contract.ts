import {axiosDelete, axiosGet, axiosPot, axiosPut} from './axios';

const TERMS = '/sale/public/terms';
const CONTRACT = '/sale/contract';
const DETAIL_CONTRACT = '/sale/contract/detail';

export const getTermsApi = (data: any) => {
  return axiosGet(TERMS, data);
};

export const createContractApi = (data: any) => {
  return axiosPot(CONTRACT, data);
};

export const getContractListApi = (data: any) => {
  return axiosDelete(CONTRACT, data);
};

export const getContractDetailApi = (data: any) => {
  return axiosGet(CONTRACT, data);
};

export const updateContractInfoApi = (data: any) => {
  return axiosPut(DETAIL_CONTRACT, data);
};
