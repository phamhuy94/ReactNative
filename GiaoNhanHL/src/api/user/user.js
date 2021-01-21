import axiosInstance from '../baseUrl';
import moment from 'moment';

export const _getUser = async (data) => {
  const response = await axiosInstance.post(
    '/api/Api_NhanVien/NhanVienPhongBan',
    data,
  );
  return response.data;
};

export const _getUserDetail = async (username) => {
  const response = await axiosInstance.get(
    '/api/Api_NhanVien/GetChiTietNhanVien/' + username,
  );
  return response.data;
};

export const _getTimeSheet = async (username) => {
  const response = await axiosInstance.get('/api/Api_BangChamCong/' + username);
  return response.data;
};

export const _getPayRoll = async (username) => {
  const response = await axiosInstance.get('/api/Api_BangLuong/' + username);
  return response.data;
};

export const _getKPI = async (macongty, username, startDate, endDate) => {
  const start = moment(startDate).format('DD/MM/YYYY');
  const end = moment(endDate).format('DD/MM/YYYY');
  const response = await axiosInstance.post(
    '/api/Api_KPIKho/BaoCaoGiaoNhan_New',
    {
      macongty: macongty,
      username: username,
      tungay: start,
      denngay: end,
    },
  );
  return response.data;
};

export const _getDemDanhSachBaiViet = async () => {
  const response = await axiosInstance.post(
    'api/Api_POST_CATEGORIES/DemDanhSachBaiViet',
    {
      madanhmuc: '',
      tungay: '',
      denngay: '',
      tukhoa: '',
      sotrang: 'page',
    },
  );
  return response.data;
};
