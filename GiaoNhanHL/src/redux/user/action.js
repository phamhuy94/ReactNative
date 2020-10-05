import axios from "axios";

export const getUser = (maPhongBan) => async dispatch => {
    await dispatch({ type: 'GET_USER_REQUEST' });
    try {
        axios.post('http://sales.hoplong.com/api/Api_NhanVien/NhanVienPhongBan', {
            isadmin: false,
            maphongban: maPhongBan,
            macongty: 'HOPLONG'
          })
          .then(function (response) {
            return dispatch({
                type: 'GET_USER_SUCCESS',
                data: response.data
            });
          })
          .catch(function (error) {
            console.log(error);
          });
        
    } catch (err) {
        return dispatch({ type: 'GET_USER_ERROR', err });
    }
}

export const getUserDetail = (username) => async dispatch => {
    const url = 'http://sales.hoplong.com/api/Api_NhanVien/GetChiTietNhanVien/' + username;
    axios.get(url)
          .then(function (response) {
            return dispatch({
                type: 'GET_USER_DETAIL_SUCCESS',
                data: response.data
            });
          })
          .catch(function (error) {
            console.log(error);
          });
}