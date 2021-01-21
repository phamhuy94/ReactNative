const initialState = {
  getDonXacNhanNV: [],
  postDonXacNhanNV: [],
  demDonXacNhanNV: [],
  isLoading: true,
  err: null,
};

const xacNhan = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DON_XAC_NHAN_NV':
      return {
        ...state,
        getDonXacNhanNV: action.data,
        isLoading: false,
      };
    case 'POST_DON_XAC_NHAN_NV':
      return {
        ...state,
        postDonXacNhanNV: action.data,
        isLoading: false,
      };
    case 'DEM_DON_XAC_NHAN_NV':
      return {
        ...state,
        demDonXacNhanNV: action.data,
        isLoading: false,
      };
      case 'UPDATE_DON_XAC_NHAN':
        return {
            ...state,
            isLoading: false,
        };
      case 'DELETE_DON_XAC_NHAN':
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
export default xacNhan;
