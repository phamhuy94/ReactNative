import { _getUser, _getUserDetail } from '../../api/user/user'

export const getUser = (maPhongBan) => {
    const data = {
        isadmin: false,
        maphongban: maPhongBan,
        macongty: 'HOPLONG'
    }
    return async (dispatch) => {
        try {
            const response = await _getUser(data);
            dispatch({
                type: 'GET_USER_SUCCESS',
                data: response
            });
        } catch (e) {
            return dispatch({ type: 'GET_USER_ERROR', err });
        }
    }
}

export const getUserDetail = (username) => {
    return async (dispatch) => {
        try {
            const response = await _getUserDetail(username);
            dispatch({
                type: 'GET_USER_DETAIL_SUCCESS',
                data: response
            });
        } catch (e) {
            console.log(error);
        }
    }
}

export const getUserRequest = () => ({
    type: 'GET_USER_REQUEST'
})
