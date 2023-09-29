import {Axios} from 'axios';
import {axiosGet, axiosPot, axiosPut} from './axios';

const REPORT_PRODUCT = '/sale/report/revenue/product';

const REPORT_CUSTOMER = '/sale/report/lead/count';

const REPORT_CONTRACT = '/sale/report/contract/count';

const REPORT_INCOME = '/sale/report/income';

export const getProductReportApi = (data: any) => {
  return axiosGet(REPORT_PRODUCT, data);
};

export const getCustomerReportApi = (data: any) => {
  return axiosPot(REPORT_CUSTOMER, data);
};

export const getContractReportApi = (data: any) => {
  return axiosGet(REPORT_CONTRACT, data);
};

export const getIncomeReportApi = (data: any) => {
  return axiosPot(REPORT_INCOME, data);
};
