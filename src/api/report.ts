import {axiosGet, axiosPot, axiosPut} from './axios';

const REPORT_PRODUCT = 'sale/report/revenue/product';

const REPORT_CUSTOMER = 'sale/report/lead/count';

export const getProductReportApi = (data: any) => {
  return axiosGet(REPORT_PRODUCT, data);
};

export const getCustomerReportApi = (data: any) => {
  return axiosPot(REPORT_CUSTOMER, data);
};
