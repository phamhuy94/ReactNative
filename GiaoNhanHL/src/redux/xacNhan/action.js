import {_getDonXacNhanNV,_postDonXacNhanNV, _demDonXacNhanNV, _deleteDonXacNhan} from '../../api/xacNhan/xacNhan';

export const GetDonXacNhanNV = (trucThuoc,username,isadmin,maphongban,chucvu,tukhoa,sotrang,sobanghi) => {
    return async (dispatch) => {
        try {
            const response = await _getDonXacNhanNV(trucThuoc,username,isadmin,maphongban,chucvu,tukhoa,sotrang,sobanghi);
            dispatch({
                type:'GET_DON_XAC_NHAN_NV',
                data: response
            });
        }catch (e) {
            return dispatch({type: 'GET_DATA_ERROR', e})
        }
    }
}

export const PostDonXacNhanNV = (nguoiDeNghi,noiDungCanXacNhan,ngayCanXacNhan,trucThuoc) => {
    return async (dispatch) => {
        try {
            const response = await _postDonXacNhanNV(nguoiDeNghi,noiDungCanXacNhan,ngayCanXacNhan,trucThuoc);
            dispatch({
                type:'POST_DON_XAC_NHAN_NV',
                data: response
            });
        }catch (e) {
            return dispatch({type: 'GET_DATA_ERROR', e})
        }
    }
}

export const DemDonXacNhanNV = (trucThuoc,username,isadmin,maphongban,chucvu,tukhoa,sotrang,sobanghi) => {
    return async (dispatch) => {
        try {
            const response = await _demDonXacNhanNV(trucThuoc,username,isadmin,maphongban,chucvu,tukhoa,sotrang,sobanghi);
            dispatch({
                type:'DEM_DON_XAC_NHAN_NV',
                data:response
            });
        }catch (e) {
            return dispatch({type: 'GET_DATA_ERROR', e})
        }
    }
}

export const CapNhatDonXacNhan = (noidungcanxacnhan,ngaycanxacnhan) => {
    return async (dispatch) => {
        try{
            const response = await _capNhatDonXacNhan(noidungcanxacnhan,ngaycanxacnhan);
            dispatch({
                type:'UPDATE_DON_XAC_NHAN',
                data:response
            })
        }catch(e) {
            return dispatch({type: 'GET_DATA_ERROR',e})
        }
    }
}

export const DeleteDonXacNhan = (id) => {
    return async (dispatch) => {
        try{
            const response = await _deleteDonXacNhan(id);
            dispatch({
                type:'DELETE_DON_XAC_NHAN',
                data:response
            })
        }catch(e) {
            return dispatch({type: 'GET_DATA_ERROR',e})
        }
    }
}
