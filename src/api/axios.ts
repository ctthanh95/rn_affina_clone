import axios from 'axios';
import Config from 'react-native-config';
import {storage} from '@utils/mmkv';

const REQUEST_TIMEOUT = 60000;

const TOKEN_EXPIRED_CODE = '4001';

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const HEADERS_FORM_DATA = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
};

const instance = axios.create({
  baseURL: Config.API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: HEADERS,
});

instance.interceptors.request.use(
  async function (config) {
    const token = storage.getString('token');
    if (token) {
      config.headers['token'] = token;
    } else {
      config.headers['token'] = null;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    const code = response?.data?.code;
    if (code === TOKEN_EXPIRED_CODE) {
      console.log('TOKEN_EXPIRED_CODE');
    }
    return response;
  },
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  },
);

export const axiosGet = async (url: string, data?: any) => {
  return await instance
    .get(url, {
      params: {
        ...data,
      },
    })
    .then(res => {
      // console.log('res', res);
      return res.data || {};
    })
    .catch(err => {
      return err;
    });
};

export const axiosPot = async (url: string, data?: any) => {
  return await instance
    .post(url, data)
    .then(res => {
      // console.log('res', res);
      return res.data || {};
    })
    .catch(err => {
      return err;
    });
};

export const axiosPut = async (url: string, data?: any) => {
  return await instance
    .put(url, data)
    .then(res => {
      // console.log('res', res);
      return res.data || {};
    })
    .catch(err => {
      return err;
    });
};

export const axiosFormData = async (url: string, data?: any) => {
  const bodyFormData = new FormData();
  bodyFormData.append('file', data);
  return await instance
    .post(url, bodyFormData, {
      headers: HEADERS_FORM_DATA,
    })
    .then(res => {
      // console.log('res', res);
      return res.data || {};
    })
    .catch(err => {
      return err;
    });
};

export const axiosDelete = async (url: string, data?: any) => {
  return await instance
    .delete(url, {
      data,
    })
    .then(res => {
      // console.log('res', res);
      return res.data || {};
    })
    .catch(err => {
      return err;
    });
};
