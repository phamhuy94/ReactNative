import axiosInstance from '../baseUrl2';
import moment from 'moment';

//List bao cao thu tien
export const _getListBaoCaoThuTien = async (
  macongty,
  username,
  isadmin,
  tukhoa1,
  tukhoa2,
  tukhoa3,
  startDate,
  sotrang
) => {
  const start = moment(startDate).format('DD/MM/YYYY');
  const response = await axiosInstance.post(
    '/api/Api_GiaoHang/BaoCaoThuTienPXK',
    {
      macongty: macongty,
      username: username,
      isadmin: isadmin,
      tukhoa1: tukhoa1,
      tukhoa2: tukhoa2,
      tukhoa3: tukhoa3,
      tungay: start,
      sotrang: sotrang
    },
  );
  return response.data;
};

//Dem toan bo list bao cao thu tien

export const _demListBaoCaoThuTien = async ( 
  macongty,
  username,
  isadmin,
  tukhoa1,
  tukhoa2,
  tukhoa3,
  startDate,
  sotrang) => {
    const start = moment(startDate).format('DD/MM/YYYY');
    const response = await axiosInstance.post('/api/Api_GiaoHang/DemBaoCaoThuTienPXK', {
      macongty: macongty,
      username: username,
      isadmin: isadmin,
      tukhoa1: tukhoa1,
      tukhoa2: tukhoa2,
      tukhoa3: tukhoa3,
      tungay: start,
      sotrang: sotrang
    });
    return response.data;
}

