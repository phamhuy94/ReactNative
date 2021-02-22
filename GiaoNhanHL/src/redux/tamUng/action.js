import {
    callApiTamUng,
    callApiDemDonTamUng,
    callApiTaoTamUng,
    callApiDeleteTamUng
} from '../../api/tamUng/tamUng';
export const GET_DON_TAM_UNG = 'GET_DON_TAM_UNG';
export const COUNT_DON_TAM_UNG = 'COUNT_DON_TAM_UNG';
export const POST_DON_TAM_UNG = 'POST_DON_TAM_UNG';
export const DELETE_DON_TAM_UNG = 'DELETE_DON_TAM_UNG';

export const getApiTamUng = (body) => async dispatch => {
    try {
        callApiTamUng(body)
        .then(function(res){
            return dispatch({type: GET_DON_TAM_UNG, data: res})
        })
    } catch (error) {
        console.log(error);
    }
};

export const getApiDemDonTamUng = (body) => async dispatch => {
    try {
        callApiDemDonTamUng(body)
        .then(function(res){
            return dispatch({type: COUNT_DON_TAM_UNG, data: res})
        })
    } catch (error) {
        console.log(error);
    }
};

export const getApiDeleteTamUng = (id, body) => async dispatch => {
    try {
        callApiDeleteTamUng(id)
        .then(async() => {
            await dispatch({type: DELETE_DON_TAM_UNG});
            await dispatch(getApiTamUng(body));
            await dispatch(getApiDemDonTamUng(body));
        });
    } catch (error) {
        console.log(error);
    }
};

export const getApiTaoTamUng = (nguoiDeNghi, lyDoDN, soTienDN, SoTienChu, maCongTy, body) => async dispatch => {
    try {
        callApiTaoTamUng(nguoiDeNghi, lyDoDN, soTienDN, SoTienChu, maCongTy)
        .then(async() => {
            await dispatch({type: POST_DON_TAM_UNG});
            await dispatch(getApiTamUng(body));
            await dispatch(getApiDemDonTamUng(body));
        });
    } catch (error) {
        console.log(error);
    }
};