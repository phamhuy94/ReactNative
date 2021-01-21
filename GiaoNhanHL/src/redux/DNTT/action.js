import {
  _getDeNghiTTNVCanDuyet,
  _demListDeNghiTTNVCanDuyet,
  _getDeNghiTTNVCanThanhToan,
  _demListDeNghiTTNVCanThanhToan,
  _getDeNghiTTNVDaThanhToan,
  _getDeNghiTTNVDaHuy,
  _demListDeNghiTTNVDaHuy,
  _postDeNghiTT,
  _demListDeNghiTTNVDaThanhToan,
  _deleteDeNghiTT,
} from '../../api/DNTT/deNghiThanhToan';

export const GetDeNghiTTNVCanDuyet = (
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
  return async (dispatch) => {
    try {
      const response = await _getDeNghiTTNVCanDuyet(
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
      );
      dispatch({
        type: 'GET_DE_NGHI_TTNV_CAN_DUYET_SUCCESS',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};

export const DemListDeNghiTTNVCanDuyet = (
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
  return async (dispatch) => {
    try {
      const response = await _demListDeNghiTTNVCanDuyet(
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
      );
      dispatch({
        type: 'DEM_LIST_DE_NGHI_TTNV_CAN_DUYET_SUCCESS',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};

export const GetDeNghiTTNVCanThanhToan = (
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
  return async (dispatch) => {
    try {
      const response = await _getDeNghiTTNVCanThanhToan(
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
      );
      dispatch({
        type: 'GET_DE_NGHI_TTNV_CAN_THANH_TOAN',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};

export const DemListDeNghiTTNVCanThanhToan = (
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
  return async (dispatch) => {
    try {
      const response = await _demListDeNghiTTNVCanThanhToan(
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
      );
      dispatch({
        type: 'DEM_LIST_DE_NGHI_TTNV_CAN_THANH_TOAN',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};

export const GetDeNghiTTNVDaThanhToan = (
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
  return async (dispatch) => {
    try {
      const response = await _getDeNghiTTNVDaThanhToan(
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
      );
      dispatch({
        type: 'GET_DE_NGHI_TTNV_DA_THANH_TOAN',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};

export const DemListDeNghiTTNVDaThanhToan = (
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
  return async (dispatch) => {
    try {
      const response = await _demListDeNghiTTNVDaThanhToan(
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
      );
      dispatch({
        type: 'DEM_LIST_DE_NGHI_TTNV_DA_THANH_TOAN',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};

export const GetDeNghiTTNVDaHuy = (
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
  return async (dispatch) => {
    try {
      const response = await _getDeNghiTTNVDaHuy(
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
      );
      dispatch({
        type: 'GET_DE_NGHI_TTNV_DA_HUY',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};

export const DemListDeNghiTTNVDaHuy = (
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
  return async (dispatch) => {
    try {
      const response = await _demListDeNghiTTNVDaHuy(
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
      );
      dispatch({
        type: 'DEM_LIST_DE_NGHI_TTNV_DA_HUY',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};

export const PostDeNghiTT = (
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
  return async (dispatch) => {
    try {
      const response = await _postDeNghiTT(
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
      );
      dispatch({
        type: 'POST_DE_NGHI_TT',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};

export const DeleteDeNghiTT = (id) => {
  return async (dispatch) => {
      try{
          const response = await _deleteDeNghiTT(id);
          dispatch({
              type:'DELETE_DE_NGHI_TT',
              data:response
          })
      }catch(e) {
          return dispatch({type: 'GET_DATA_ERROR',e})
      }
  }
}
