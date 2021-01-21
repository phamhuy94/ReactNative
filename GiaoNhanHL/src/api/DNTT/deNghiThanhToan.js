import axiosInstance from '../baseUrl';

//Lay toan bo de nghi thanh toan can duyet
export const _getDeNghiTTNVCanDuyet = async (
  isadmin,
  username,
  maphongban,
  chucvu,
  macongty,
  tukhoa,
  tukhoa2,
  tukhoa3,
  tukhoa4,
  tukhoa5,
  sotrang,
  sobanghi,
) => {
  const response = await axiosInstance.post(
    '/api/Api_DeNghiThanhToan/GetDeNghiTTNVCanDuyet',
    {
      isadmin: isadmin,
      username: username,
      maphongban: maphongban,
      chucvu: chucvu,
      macongty: macongty,
      tukhoa: tukhoa,
      tukhoa2: tukhoa2,
      tukhoa3: tukhoa3,
      tukhoa4: tukhoa4,
      tukhoa5: tukhoa5,
      sotrang: sotrang,
      sobanghi: sobanghi,
    },
  );
  return response.data;
};

//DEM toan bo de nghi thanh toan Can Duyet
export const _demListDeNghiTTNVCanDuyet = async (
  isadmin,
  username,
  maphongban,
  chucvu,
  macongty,
  tukhoa,
  tukhoa2,
  tukhoa3,
  tukhoa4,
  tukhoa5,
  sotrang,
  sobanghi,
) => {
  const response = await axiosInstance.post(
    '/api/Api_DeNghiThanhToan/DemListDeNghiTTNVCanDuyet',
    {
      isadmin: isadmin,
      username: username,
      maphongban: maphongban,
      chucvu: chucvu,
      macongty: macongty,
      tukhoa: tukhoa,
      tukhoa2: tukhoa2,
      tukhoa3: tukhoa3,
      tukhoa4: tukhoa4,
      tukhoa5: tukhoa5,
      sotrang: sotrang,
      sobanghi: sobanghi,
    },
  );
  return response.data;
};

//Lay toan bo de nghi thanh toan Can Thanh Toan
export const _getDeNghiTTNVCanThanhToan = async (
  isadmin,
  username,
  maphongban,
  chucvu,
  macongty,
  tukhoa,
  tukhoa2,
  tukhoa3,
  tukhoa4,
  tukhoa5,
  sotrang,
  sobanghi,
) => {
  const response = await axiosInstance.post(
    '/api/Api_DeNghiThanhToan/GetDeNghiTTNVCanThanhToan',
    {
      isadmin: isadmin,
      username: username,
      maphongban: maphongban,
      chucvu: chucvu,
      macongty: macongty,
      tukhoa: tukhoa,
      tukhoa2: tukhoa2,
      tukhoa3: tukhoa3,
      tukhoa4: tukhoa4,
      tukhoa5: tukhoa5,
      sotrang: sotrang,
      sobanghi: sobanghi,
    },
  );
  return response.data;
};

//DEM toan bo de nghi thanh toan Can thanh toan
export const _demListDeNghiTTNVCanThanhToan = async () => {
  const response = await axiosInstance.post(
    '/api/Api_DeNghiThanhToan/DemListDeNghiTTNVCanThanhToan',
    {
      isadmin: isadmin,
      username: username,
      maphongban: maphongban,
      chucvu: chucvu,
      macongty: macongty,
      tukhoa: tukhoa,
      tukhoa2: tukhoa2,
      tukhoa3: tukhoa3,
      tukhoa4: tukhoa4,
      tukhoa5: tukhoa5,
      sotrang: sotrang,
      sobanghi: sobanghi,
    },
  );
  return response.data;
};

//Lay toan bo de nghi thanh toan Da Thanh Toan
export const _getDeNghiTTNVDaThanhToan = async (
  isadmin,
  username,
  maphongban,
  chucvu,
  macongty,
  tukhoa,
  tukhoa2,
  tukhoa3,
  tukhoa4,
  tukhoa5,
  sotrang,
  sobanghi,
) => {
  const response = await axiosInstance.post(
    '/api/Api_DeNghiThanhToan/GetDeNghiTTNVDaThanhToan',
    {
      isadmin: isadmin,
      username: username,
      maphongban: maphongban,
      chucvu: chucvu,
      macongty: macongty,
      tukhoa: tukhoa,
      tukhoa2: tukhoa2,
      tukhoa3: tukhoa3,
      tukhoa4: tukhoa4,
      tukhoa5: tukhoa5,
      sotrang: sotrang,
      sobanghi: sobanghi,
    },
  );
  return response.data;
};

//DEM toan bo de nghi thanh toan Da Thanh Toan
export const _demListDeNghiTTNVDaThanhToan = async (
  isadmin,
  username,
  maphongban,
  chucvu,
  macongty,
  tukhoa,
  tukhoa2,
  tukhoa3,
  tukhoa4,
  tukhoa5,
  sotrang,
  sobanghi,
) => {
  const response = await axiosInstance.post(
    '/api/Api_DeNghiThanhToan/DemListDeNghiTTNVDaThanhToan',
    {
      isadmin: isadmin,
      username: username,
      maphongban: maphongban,
      chucvu: chucvu,
      macongty: macongty,
      tukhoa: tukhoa,
      tukhoa2: tukhoa2,
      tukhoa3: tukhoa3,
      tukhoa4: tukhoa4,
      tukhoa5: tukhoa5,
      sotrang: sotrang,
      sobanghi: sobanghi,
    },
  );
  return response.data;
};

//Lay toan bo de nghi thanh toan DA HUY
export const _getDeNghiTTNVDaHuy = async (
  isadmin,
  username,
  maphongban,
  chucvu,
  macongty,
  tukhoa,
  tukhoa2,
  tukhoa3,
  tukhoa4,
  tukhoa5,
  sotrang,
  sobanghi,
) => {
  const response = await axiosInstance.post(
    '/api/Api_DeNghiThanhToan/GetDeNghiTTNVDaHuy',
    {
      isadmin: isadmin,
      username: username,
      maphongban: maphongban,
      chucvu: chucvu,
      macongty: macongty,
      tukhoa: tukhoa,
      tukhoa2: tukhoa2,
      tukhoa3: tukhoa3,
      tukhoa4: tukhoa4,
      tukhoa5: tukhoa5,
      sotrang: sotrang,
      sobanghi: sobanghi,
    },
  );
  return response.data;
};

//DEM toan bo de nghi thanh toan DA HUY
export const _demListDeNghiTTNVDaHuy = async (
  isadmin,
  username,
  maphongban,
  chucvu,
  macongty,
  tukhoa,
  tukhoa2,
  tukhoa3,
  tukhoa4,
  tukhoa5,
  sotrang,
  sobanghi,
) => {
  const response = await axiosInstance.post(
    '/api/Api_DeNghiThanhToan/DemListDeNghiTTNVDaHuy',
    {
      isadmin: isadmin,
      username: username,
      maphongban: maphongban,
      chucvu: chucvu,
      macongty: macongty,
      tukhoa: tukhoa,
      tukhoa2: tukhoa2,
      tukhoa3: tukhoa3,
      tukhoa4: tukhoa4,
      tukhoa5: tukhoa5,
      sotrang: sotrang,
      sobanghi: sobanghi,
    },
  );
  return response.data;
};

//Tao de nghi thanh toan chung (Can duyet, da duyet, cho duyet, huy)
export const _postDeNghiTT = async (
  nguoiDeNghi,
  noiDungDNTT,
  tongTien,
  dienGiai,
  thanhTien,
  ghiChu,
  nguoiLapPhieu,
  trucThuoc,
  hinhThucThanhToan,
  thanhToanTheoCongTy,
  soTK,
  nganHang,
  chiNhanhNganHang,
  nguoiThuHuong,
  loaiTaiKhoan,
) => {

  const data = {
    NGUOI_DN: nguoiDeNghi,
    NOI_DUNG_DNTT: noiDungDNTT,
    TONG_TIEN: tongTien,
    ChiTietTT: [
      {
        DIEN_GIAI: dienGiai,
        THANH_TIEN: thanhTien,
        GHI_CHU: ghiChu,
      },
    ],
    NGUOI_LAP_PHIEU: nguoiLapPhieu,
    TRUC_THUOC: trucThuoc,
    HINH_THUC_THANH_TOAN: hinhThucThanhToan,
    THANH_TOAN_THEO_CONG_TY: thanhToanTheoCongTy,
    SOTK: soTK,
    NGAN_HANG: nganHang,
    CHI_NHANH_NGAN_HANG: chiNhanhNganHang,
    NGUOI_THU_HUONG: nguoiThuHuong,
    LOAI_TAI_KHOAN: loaiTaiKhoan,
  };
  console.log(data)
  const response = await axiosInstance.post(
    '/api/Api_DeNghiThanhToan/PostDeNghiTT',

    data,
  );
  return response.data;
};

export const _deleteDeNghiTT = async (id) => {
  const response = await axiosInstance.post('/api/Api_DeNghiThanhToan/DeleteDeNghiTT/' + id);
  return response.data;
}