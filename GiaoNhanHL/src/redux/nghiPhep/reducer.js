const initialState = {
  getListDonXinNghiNV: [],
  demDonXinNghiPhepNV: '',
  getTongSoNgayNghiNV: [],
  donXinNghiPhepDaDuyet: [],
  demDonXinNghiPhepDaDuyet: '',
  isLoading: true,
  err: null,
};

const nghiPhep = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DON_XIN_NGHI_NV':
      return {
        ...state,
        getListDonXinNghiNV: action.data,
        isLoading: false,
      };
    case 'DEM_DON_XIN_NGHI_NV':
      return {
        ...state,
        demDonXinNghiPhepNV: action.data,
        isLoading: false,
      };
    case 'GET_TONG_SO_NGAY_NGHI_NV':
      return {
        ...state,
        getTongSoNgayNghiNV: action.data,
        isLoading: false,
      };
    case 'POST_DON_XIN_NGHI_NV':
      return {
        ...state,
        isLoading: false,
      };
    case 'DON_XIN_NGHI_PHEP_DA_DUYET':
      return {
        ...state,
        donXinNghiPhepDaDuyet: action.data,
        isLoading: false,
      };
    case 'DEM_DON_XIN_NGHI_PHEP_DA_DUYET':
      return {
        ...state,
        demDonXinNghiPhepDaDuyet: action.data,
        isLoading: false,
      };
    case 'DELETE_DON_NGHI_PHEP':
      return {
        ...state,
        isLoading: false,
      };
    case 'UPDATE_DON_NGHI_PHEP':
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

export default nghiPhep;
