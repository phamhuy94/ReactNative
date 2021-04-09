const initialState = {
  listBaoCaoTong: [],
  isLoading: true,
  err: null,
};

const baoCaoTong = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BAO_CAO_TONG':
      return {
        ...state,
        listBaoCaoTong: action.data,
        isLoading: false,
      };
    case 'UPDATE_DON_GIAO':
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

export default baoCaoTong;
