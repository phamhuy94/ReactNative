const initialState = {
    listUser: [],
    UserDetail:[],
    isLoading: true,
    err: null
}
const user = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_REQUEST':
            return {
                ...state,
                isLoading: true,
                listUser: [],
                UserDetail: []
            };
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                listUser: action.data,
                isLoading: false
            };
        case 'GET_USER_DETAIL_SUCCESS':
            return {
                ...state,
                UserDetail: action.data,
                isLoading: false
            };
        case 'GET_USER_ERROR':
            return {
                ...state,
                isLoading: false,
                err: action.err
            };
        default:
            return state;
    }
};

export default user;