import {axiosGet, axiosPot, axiosPut} from './axios';

const LOGIN = '/user/sale/login';
const LOGOUT = '/user/sale/logout';
const PASSWORD = '/user/sale/password';
const OTP = '/user/otp';

export const checkPhoneLoginApi = (phone: string) => {
  return axiosGet(LOGIN, {phone});
};

export const signInApi = (data: any) => {
  return axiosPot(LOGIN, data);
};

export const signOutApi = () => {
  return axiosGet(LOGOUT);
};

export const submitOtpApi = (data: any) => {
  return axiosPut(OTP, data);
};

export const forgetPasswordApi = (phone: string) => {
  return axiosGet(PASSWORD, {phone});
};

export const changePasswordApi = (data: any) => {
  return axiosPot(PASSWORD, data);
};
