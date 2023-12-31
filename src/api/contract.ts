import {axiosDelete, axiosGet, axiosPot, axiosPut} from './axios';

const TERMS = '/sale/public/terms';
const CONTRACT = '/sale/contract';
const DETAIL_CONTRACT = '/sale/contract/detail';
const TRANSACTION = '/sale/public/transaction';

export const getTermsApi = (data: any) => {
  return axiosGet(TERMS, data);
};

export const createContractApi = (data: any) => {
  return axiosPot(CONTRACT, data);
};

export const updateContractApi = (data: any) => {
  return axiosPut(CONTRACT, data);
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

export const checkSmartPayApi = (data: any) => {
  return axiosPot(TRANSACTION, data);
};
