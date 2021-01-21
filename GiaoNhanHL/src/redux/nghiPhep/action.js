import {_getDonXinNghiNV,_demDonXinNghiPhepNV,_getTongSoNgayNghiNV, _postDonXinNghiNV, _donXinNghiPhepDaDuyet,_deleteDonNghiPhep,_updateDonNghiPhep} from '../../api/nghiPhep/nghiPhep';

export const GetDonXinNghiNV = (trucThuoc,username,isadmin,tukhoa,tukhoa2,sotrang,sobanghi) => {
    return async (dispatch) => {
        try {
            const response = await _getDonXinNghiNV(trucThuoc,username,isadmin,tukhoa,tukhoa2,sotrang,sobanghi);
            dispatch({
                type: 'GET_DON_XIN_NGHI_NV',
                data: response
            });
        } catch (e) {
            return dispatch({type: 'GET_DATA_ERROR', e})
        }
    }
};

export const DemDonXinNghiPhepNV = (trucThuoc,username,isadmin,tukhoa,tukhoa2) => {
    return async (dispatch) => {
        try {
            const response = await _demDonXinNghiPhepNV(trucThuoc,username,isadmin,tukhoa,tukhoa2);
            dispatch({
                type:'DEM_DON_XIN_NGHI_NV',
                data:response
            });
        }catch (e) {
            return dispatch({type: 'GET_DATA_ERROR',e})
        }
    }
}

export const GetTongSoNgayNghiNV = (trucThuoc,isadmin,username,maphongban,thang,nam,tukhoa) => {
    return async (dispatch) => {
        try{ 
            const response = await _getTongSoNgayNghiNV(trucThuoc,isadmin,username,maphongban,thang,nam,tukhoa);
            dispatch({
                type:'GET_TONG_SO_NGAY_NGHI_NV',
                data:response
            });
        }catch (e) {
            return dispatch({type: 'GET_DATA_ERROR',e})
        }
    }
}

export const PostDonXinNghiNV = (username, lyDoNghi, loaiNghiPhep, dateTime, tongSoNgay, trucThuoc, dateTimeRow, day) => {
    return async (dispatch) => {
        try{
            const response = await _postDonXinNghiNV(username, lyDoNghi, loaiNghiPhep, dateTime, tongSoNgay, trucThuoc, dateTimeRow, day);
            dispatch({
                type:'POST_DON_XIN_NGHI_NV',
                data:response
            });
        }catch(e) {
            return dispatch({type: 'GET_DATA_ERROR',e})
        }
    }
}

export const DonXinNghiPhepDaDuyet = (trucThuoc,username,isadmin,maphongban,tukhoa1,tukhoa2,tukhoa3,sotrang,sobanghi) => {
    return async (dispatch) => {
        try {
            const response = await _donXinNghiPhepDaDuyet(trucThuoc,username,isadmin,maphongban,tukhoa1,tukhoa2,tukhoa3,sotrang,sobanghi);
            dispatch({
                type:'DON_XIN_NGHI_PHEP_DA_DUYET',
                data:response
            });
        } catch(e) {
            return dispatch({type: 'GET_DATA_ERROR',e})
        }
    }
}

export const DemDonXinNghiPhepDaDuyet = (trucThuoc,username,isadmin,maphongban,tukhoa1,tukhoa2,tukhoa3,sotrang,sobanghi) => {
    return async (dispatch) => {
        try {
            const response = await _demDonXinNghiPhepDaDuyet(trucThuoc,username,isadmin,maphongban,tukhoa1,tukhoa2,tukhoa3,sotrang,sobanghi);
            dispatch({
                type:'DEM_DON_XIN_NGHI_PHEP_DA_DUYET',
                data:response
            })
        }catch(e) {
            return dispatch({type: 'GET_DATA_ERROR',e})
        }
    }
}

export const DeleteDonNghiPhep = (id) => {
    return async (dispatch) => {
        try{
            const response = await _deleteDonNghiPhep(id);
            dispatch({
                type:'DELETE_DON_NGHI_PHEP',
                data:response
            })
        }catch(e) {
            return dispatch({type: 'GET_DATA_ERROR',e})
        }
    }
}

export const UpdateDonNghiPhep = (lydoxinnghi,thoigiannghi,tongsongaynghi,nguoidenghi,listRow) => {
    return async (dispatch) => {
        try {
            const response = await _updateDonNghiPhep(lydoxinnghi,thoigiannghi,tongsongaynghi,nguoidenghi,listRow);
            dispatch({
                type:'UPDATE_DON_NGHI_PHEP',
                data:response
            })
        }catch(e) {
            return dispatch({type: 'GET_DATA_ERROR',e})
        }
    }
}