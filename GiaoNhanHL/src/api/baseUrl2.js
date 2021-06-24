import {default as axios} from 'axios';
import * as AxiosLogger from 'axios-logger';

// Please change baseURL when build production
const baseURL = 'http://sales.hoplong.com:56/';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json;charset=UTF-8',
};
const timeout = 20000;

const setAxiosInstance = () => {
  const axiosInstance = axios.create({
    timeout,
    baseURL,
    headers,
  });

  return axiosInstance;
};

const axiosInstance = setAxiosInstance();
export default axiosInstance
