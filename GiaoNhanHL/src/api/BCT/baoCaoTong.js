import axiosInstance from '../baseUrl2';
import moment from 'moment';

export const _getBaoCaoTong = async (
  macongty,
  username,
  isadmin,
  startDate,
) => {
  const start = moment(startDate).format('DD/MM/YYYY');
  const response = await axiosInstance.post(
    '/api/Api_GiaoHang/BaoCaThoiGianGiaoHang',
    {
      macongty: macongty,
      username: username,
      isadmin: isadmin,
      tungay: start,
    },
  );
  return response.data;
};

export const _updateDonGiao = async (mavach, ghichugiaonhan, loaiXuatKho) => {
  const data = {
    MA_VACH: mavach,
    GHI_CHU_GIAO_NHAN: ghichugiaonhan,
    LOAI_XUAT_KHO: loaiXuatKho
  }
  const response = await axiosInstance.post('/api/Api_GiaoHang/CapNhatNoteDonGiao', 
    data
  )
  return response.data;
  
}