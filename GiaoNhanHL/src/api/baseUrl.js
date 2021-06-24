import {default as axios} from 'axios';
import * as AxiosLogger from 'axios-logger';

// const baseURL = 'http://localhost:3000';
// Please change baseURL when build production
const baseURL = 'http://app.hoplong.com/';
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

  // axiosInstance.interceptors.request.use(
  //   AxiosLogger.requestLogger,
  //   AxiosLogger.errorLogger,
  // );

  // axiosInstance.interceptors.response.use(
  //   AxiosLogger.responseLogger,
  //   AxiosLogger.errorLogger,
  // );

  // Do whatever you want with axiosInstance

  return axiosInstance;
};
const axiosInstance = setAxiosInstance();
export default axiosInstance;