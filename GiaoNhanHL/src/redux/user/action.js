import {
  _getUser,
  _getUserDetail,
  _getTimeSheet,
  _getPayRoll,
  _getKPI,
  _getDemDanhSachBaiViet,
} from '../../api/user/user';
import user from './reducer';

export const getUser = (maPhongBan) => {
  const data = {
    isadmin: false,
    maphongban: maPhongBan,
    macongty: 'HOPLONG',
  };
  return async (dispatch) => {
    try {
      const response = await _getUser(data);
      dispatch({
        type: 'GET_USER_SUCCESS',
        data: response,
      });
    } catch (e) {
      return dispatch({type: 'GET_USER_ERROR', err});
    }
  };
};

export const getUserDetail = (username) => {
  return async (dispatch) => {
    try {
      const response = await _getUserDetail(username);
      dispatch({
        type: 'GET_USER_DETAIL_SUCCESS',
        data: response,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getUserRequest = () => ({
  type: 'GET_USER_REQUEST',
});

export const getTimeSheet = (username) => {
  return async (dispatch) => {
    try {
      const response = await _getTimeSheet(username);
      dispatch({
        type: 'GET_TIME_SHEET',
        data: response,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getPayRoll = (username) => {
  return async (dispatch) => {
    try {
      const response = await _getPayRoll(username);
      dispatch({
        type: 'GET_PAY_ROLL',
        data: response,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getKPI = (macongty, username, startDate, endDate) => {
  return async (dispatch) => {
    try {
      const response = await _getKPI(macongty, username, startDate, endDate);
      dispatch({
        type: 'GET_KPI',
        dataKPI: response,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getDemDanhSachBaiViet = () => {
  return async (dispatch) => {
    try {
      const response = await _getDemDanhSachBaiViet();
      dispatch({
        type: 'GET_DEM_DANH_SACH_BAI_VIET',
        dataDemDanhSachBaiViet : response,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
