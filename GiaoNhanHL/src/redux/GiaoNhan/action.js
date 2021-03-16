import { 
    _getCanNhan, 
    _getDaNhan, 
    _getListCanNhan, 
    _getListDaNhan, 
    _xacNhanGiaoHang,
    _noteNoiDung,
    _updateGiaoHang,
    _huyDonHang,
    _khachHangNhan
} from '../../api/GiaoNhan/giaoNhan'

export const getCanNhan = (data) => {
    return async (dispatch) => {
        try {
            const response = await _getCanNhan(data);
            dispatch({
                type: 'GET_CAN_NHAN_SUCCESS',
                data: response
            });
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', e });
        }
    }
}

export const getDaNhan = (data) => {
    return async (dispatch) => {
        try {
            const response = await _getDaNhan(data);
            dispatch({
                type: 'GET_DA_NHAN_SUCCESS',
                data: response
            });
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', e });
        }
    }
}

export const getListCanNhan = (data) => {    
    return async (dispatch) => {
        try {
            const response = await _getListCanNhan(data);
            dispatch({
                type: 'GET_LIST_CAN_NHAN_SUCCESS',
                data: response
            });
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', e });
        }
    }
}

export const getListDaNhan = (data) => {    
    return async (dispatch) => {
        try {
            const response = await _getListDaNhan(data);
            dispatch({
                type: 'GET_LIST_DA_NHAN_SUCCESS',
                data: response
            });
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', e });
        }
    }
}

export const xacNhanGiaoHang = (loaiGiaoHang,listSelect, data) => {
    return async (dispatch) => {
        try {
            const response = await _xacNhanGiaoHang(loaiGiaoHang,listSelect);
            if(response.indexOf("thành công")>0){
                dispatch(getListDaNhan(data))
                dispatch(getListCanNhan(data))
                dispatch(getCanNhan(data))
                dispatch(getDaNhan(data))
            }          
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', e });
        }
    }
}

export const noteNoiDung = (data) => {
    return async (dispatch) => {
        try {
            const response = await _noteNoiDung(data);
            return response       
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', e });
        }
    }
}

export const saveUpdateGiaoHang = (data, dataUser) => {
    return async (dispatch) => {
        try {
            const response = await _updateGiaoHang(data);
                dispatch(getListDaNhan(dataUser))
                dispatch(getListCanNhan(dataUser))
                dispatch(getCanNhan(dataUser))
                dispatch(getDaNhan(dataUser))
            return response       
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', e });
        }
    }
}

export const huyDonHang = (arrayListDaNhan, data) => {
    return async (dispatch) => {
        try {
            const response = await _huyDonHang(arrayListDaNhan);
                dispatch(getListDaNhan(data))
                dispatch(getListCanNhan(data))
                dispatch(getCanNhan(data))
                dispatch(getDaNhan(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const khachHangNhan = (maKhachHang, tuKhoa, link) => {
    return async (dispatch) => {
        try {
            const response = await _khachHangNhan(maKhachHang, tuKhoa, link);
            dispatch({
                type: 'KHACH_HANG_NHAN',
                data: response
            });
        } catch (error) {
            console.log(error);
        }
    }
}