const initialState = {
  listUser: [],
  UserDetail: [],
  timeSheet: [],
  payRoll: [],
  KPI: [],
  demDanhSachBaiViet: [],
  isLoading: true,
  err: null,
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_REQUEST':
      return {
        ...state,
        isLoading: true,
        listUser: [],
        UserDetail: [],
      };
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        listUser: action.data,
        isLoading: false,
      };
    case 'GET_USER_DETAIL_SUCCESS':
      return {
        ...state,
        UserDetail: action.data,
        isLoading: false,
      };
    case 'GET_TIME_SHEET':
      return {
        ...state,
        timeSheet: action.data,
        isLoading: false,
      };
    case 'GET_PAY_ROLL':
      return {
        ...state,
        payRoll: action.data,
        isLoading: false,
      };
    case 'GET_KPI':
      return {
        ...state,
        KPI: action.dataKPI,
        isLoading: false,
      };
      case 'GET_DEM_DANH_SACH_BAI_VIET':
        return {
          ...state,
          demDanhSachBaiViet: action.dataDemDanhSachBaiViet,
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

export default user;
