import {
  _getListBaoCaoThuTien,
  _demListBaoCaoThuTien,
} from '../../api/BCTT/baoCaoThuTien';

export const getListBaoCaoThuTien = (
  macongty,
  username,
  isadmin,
  tukhoa1,
  tukhoa2,
  tukhoa3,
  startDate,
  sotrang,
) => {
  return async (dispatch) => {
    try {
      const response = await _getListBaoCaoThuTien(
        macongty,
        username,
        isadmin,
        tukhoa1,
        tukhoa2,
        tukhoa3,
        startDate,
        sotrang,
      );
      dispatch({
        type: 'GET_LIST_BAO_CAO_THU_TIEN',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};

export const demListBaoCaoThuTien = (
  macongty,
  username,
  isadmin,
  tukhoa1,
  tukhoa2,
  tukhoa3,
  startDate,
  sotrang,
) => {
  return async (dispatch) => {
    try {
      const response = await _demListBaoCaoThuTien(
        macongty,
        username,
        isadmin,
        tukhoa1,
        tukhoa2,
        tukhoa3,
        startDate,
        sotrang,
      );
      dispatch({
        type:'DEM_LIST_BAO_CAO_THU_TIEN',
        data:response
      });
    }catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};
