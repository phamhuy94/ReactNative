import { 
    _getCanNhan, 
    _getDaNhan, 
    _getListCanNhan, 
    _getListDaNhan, 
    _xacNhanGiaoHang,
    _noteNoiDung,
    _updateGiaoHang
} from '../../api/GiaoNhan/giaoNhan'

export const getCanNhan = () => {
    return async (dispatch) => {
        try {
            const response = await _getCanNhan();
            dispatch({
                type: 'GET_CAN_NHAN_SUCCESS',
                data: response
            });
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', err });
        }
    }
}

export const getDaNhan = () => {
    return async (dispatch) => {
        try {
            const response = await _getDaNhan();
            dispatch({
                type: 'GET_DA_NHAN_SUCCESS',
                data: response
            });
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', err });
        }
    }
}

export const getListCanNhan = () => {    
    return async (dispatch) => {
        try {
            const response = await _getListCanNhan();
            dispatch({
                type: 'GET_LIST_CAN_NHAN_SUCCESS',
                data: response
            });
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', err });
        }
    }
}

export const getListDaNhan = () => {    
    return async (dispatch) => {
        try {
            const response = await _getListDaNhan();
            dispatch({
                type: 'GET_LIST_DA_NHAN_SUCCESS',
                data: response
            });
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', err });
        }
    }
}

export const xacNhanGiaoHang = (loaiGiaoHang,listSelect) => {
    return async (dispatch) => {
        try {
            const response = await _xacNhanGiaoHang(loaiGiaoHang,listSelect);
            if(response.indexOf("thành công")>0){
                dispatch(getListCanNhan())
                dispatch(getCanNhan())
                dispatch(getDaNhan())
            }else{
                
            }           
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', err });
        }
    }
}

export const noteNoiDung = (data) => {
    return async (dispatch) => {
        try {
            const response = await _noteNoiDung(data);
            return response       
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', err });
        }
    }
}

export const saveUpdateGiaoHang = (data) => {
    return async (dispatch) => {
        try {
            const response = await _updateGiaoHang(data);
            return response       
        } catch (e) {
            return dispatch({ type: 'GET_DATA_ERROR', err });
        }
    }
}