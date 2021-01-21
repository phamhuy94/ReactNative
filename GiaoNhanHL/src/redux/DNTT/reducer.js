const initialState = {
  getDeNghiTTNVCanDuyet: [],
  demListDeNghiTTNVCanDuyet: [],
  getDeNghiTTNVCanThanhToan: [],
  demListDeNghiTTNVCanThanhToan: [],
  getDeNghiTTNVDaThanhToan: [],
  demListDeNghiTTNVDaThanhToan: [],
  getDeNghiTTNVDaHuy: [],
  demListDeNghiTTNVDaHuy: [],
  postDeNghiTT: [],
  isLoading: true,
  err: null,
};

const DNTT = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DE_NGHI_TTNV_CAN_DUYET_SUCCESS':
      return {
        ...state,
        getDeNghiTTNVCanDuyet: action.data,
        isLoading: false,
      };
    case 'DEM_LIST_DE_NGHI_TTNV_CAN_DUYET_SUCCESS':
      return {
        ...state,
        demListDeNghiTTNVCanDuyet: action.data,
        isLoading: false,
      };
    case 'GET_DE_NGHI_TTNV_CAN_THANH_TOAN':
      return {
        ...state,
        getDeNghiTTNVCanThanhToan: action.data,
        isLoading: false,
      };
    case 'DEM_LIST_DE_NGHI_TTNV_CAN_THANH_TOAN':
      return {
        ...state,
        demListDeNghiTTNVCanThanhToan: action.data,
        isLoading: false,
      };
    case 'GET_DE_NGHI_TTNV_DA_THANH_TOAN':
      return {
        ...state,
        getDeNghiTTNVDaThanhToan: action.data,
        isLoading: false,
      };
    case 'DEM_LIST_DE_NGHI_TTNV_DA_THANH_TOAN':
      return {
        ...state,
        demListDeNghiTTNVDaThanhToan: action.data,
        isLoading: false,
      };
    case 'GET_DE_NGHI_TTNV_DA_HUY':
      return {
        ...state,
        getDeNghiTTNVDaHuy: action.data,
        isLoading: false,
      };
    case 'DEM_LIST_DE_NGHI_TTNV_DA_HUY':
      return {
        ...state,
        demListDeNghiTTNVDaHuy: action.data,
        isLoading: false,
      };
    case 'POST_DE_NGHI_TT':
      return {
        ...state,
        postDeNghiTT: action.data,
        isLoading: false,
      };
      case 'DELETE_DE_NGHI_TT':
        return {
          ...state,
          isLoading: false,
        };
    case 'GET_USER_ERROR':
      return {
        ...state,
        isLoading: false,
        err: action.err,
      };
    default:
      return state;
  }
};

export default DNTT;
