import {
    GET_DON_TAM_UNG,
    COUNT_DON_TAM_UNG,
    POST_DON_TAM_UNG,
    DELETE_DON_TAM_UNG
} from './action';
import {REHYDRATE} from 'redux-persist';
const initialState = {
    isLoading: false,
    err: null,
    listTamUng: [],
    countTamUng: ''
};

const tamUng = (state = initialState, action) => {
    switch(action.type) {
        case REHYDRATE: {
            if(!action.payload || !action.payload.tamUng){
                return state;
            }
            return action.payload.tamUng;
        };
        case GET_DON_TAM_UNG:
            return {
                ...state,
                isLoading: false,
                listTamUng: action.data
            };
        case COUNT_DON_TAM_UNG:
            return {
                ...state,
                isLoading: false,
                countTamUng: action.data
            };
        case POST_DON_TAM_UNG:
            return {
                ...state,
                isLoading: false
            };
        case DELETE_DON_TAM_UNG:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default tamUng;