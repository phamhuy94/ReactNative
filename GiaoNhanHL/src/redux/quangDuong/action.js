import {
    _getQuangDuong,
    _postKmDau,
    _postKmCuoi
} from '../../api/quangDuong/quangDuong';

export const getQuangDuong = (macongty, username, maphongban, isadmin, ngay, tukhoa1, tukhoa2) => {
    return async (dispatch) => {
        try {
            const response = await _getQuangDuong(macongty, username, maphongban, isadmin, ngay, tukhoa1, tukhoa2);
            dispatch({
                type: 'GET_QUANG_DUONG',
                data: response
            });
        } catch (error) {
            return dispatch({type: 'GET_DATA_ERROR', error})
        }
    }
};

export const postKmDau = (username, soDau) => {
    return async (dispatch) => {
        try {
            const response = await _postKmDau(username, soDau);
            dispatch({
                type: 'POST_KM_DAU',
                data: response
            });
        } catch (error) {
            return dispatch({type: 'GET_DATA_ERROR', error})
        }
    }
};

export const postKmCuoi = (id, username, soCuoi) => {
    return async (dispatch) => {
        try {
            const response = await _postKmCuoi(id, username, soCuoi);
            dispatch({
                type: 'POST_KM_CUOI',
                data: response
            })
        } catch (error) {
            return dispatch({type: 'GET_DATA_ERROR', error})
        }
    }
}