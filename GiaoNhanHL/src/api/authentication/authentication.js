import axiosInstance from '../baseUrl';

export const login = async (data) => {
  const response = await axiosInstance.get('/api/Api_NhanVien/LoginERP/' + data.username + '/' + data.password);
  return response.data;
};