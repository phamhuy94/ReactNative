import {_getBaoCaoTong, _updateDonGiao} from '../../api/BCT/baoCaoTong';

export const getBaoCaoTong = (macongty, username, isadmin, startDate) => {
  return async (dispatch) => {
    try {
      const response = await _getBaoCaoTong(
        macongty,
        username,
        isadmin,
        startDate,
      );
      dispatch({
        type: 'GET_BAO_CAO_TONG',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};

export const UpdateDonGiao = (mavach, ghichugiaonhan, loaiXuatKho) => {
  return async (dispatch) => {
    try {
      const response = await _updateDonGiao(mavach, ghichugiaonhan, loaiXuatKho);
      dispatch({
        type: 'UPDATE_DON_GIAO',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_DATA_ERROR', e});
    }
  };
};
