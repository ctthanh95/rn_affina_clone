import {axiosGet, axiosPot, axiosPut} from './axios';

const TERMS = '/sale/public/terms';
const CONTRACT = '/sale/contract';

export const getTermsApi = (data: any) => {
  return axiosGet(TERMS, data);
};

export const createContractApi = (data: any) => {
  return axiosPot(CONTRACT, data);
};
