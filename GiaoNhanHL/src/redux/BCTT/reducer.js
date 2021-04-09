const initialState = {
  listBaoCaoThuTien: [],
  demListBaoCaoThuTien: [],
  isLoading: true,
  err: null,
};

const baoCaoThuTien = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LIST_BAO_CAO_THU_TIEN':
      return {
        ...state,
        listBaoCaoThuTien: action.data,
        isLoading: false,
      };
    case 'DEM_LIST_BAO_CAO_THU_TIEN':
      return {
        ...state,
        demListBaoCaoThuTien: action.data,
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

export default baoCaoThuTien;
