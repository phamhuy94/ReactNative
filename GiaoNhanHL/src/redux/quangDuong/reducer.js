const initialState = {
    listQuangDuong: [],
    isLoading: true,
    err: null,
};

const quangDuong = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_QUANG_DUONG':
            return {
                ...state,
                listQuangDuong: action.data,
                isLoading: false
            };
        case 'POST_KM_DAU':
            return {
                ...state,
                isLoading: false
            };
        case 'POST_KM_CUOI':
            return {
                ...state,
                isLoading: false
            };
        case 'GET_DATA_ERROR':
            return {
                ...state,
                isLoading: false,
                err: action.err
            };
        default:
            return state;
    }
};
export default quangDuong;