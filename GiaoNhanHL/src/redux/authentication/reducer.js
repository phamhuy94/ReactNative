import {RESTORE_TOKEN, BEFORE_SIGN_IN, SIGN_IN, SIGN_IN_FAILED, SIGN_OUT} from './action';
import {REHYDRATE} from 'redux-persist';

const initialState = {
    isLoading: true,
    isSignout: false,
    isSignInFailed:false,
    alertText:null,
    userToken: null,
};
const authentication = (state = initialState, action) => {   
    switch (action.type) {
        case RESTORE_TOKEN:
          return {
            ...state,
            userToken: action.token,
            isLoading: false,
          };
        case SIGN_IN:
          return {
            ...state,
            isSignout: false,
            userToken: action.token,
          };
        case SIGN_IN_FAILED:
          return {
            ...state,
            isSignInFailed: true,
            alertText:action.alertText
          };
        case BEFORE_SIGN_IN:
          return {
            ...state,
            isSignInFailed: false,
            alertText:null
          };
        case SIGN_OUT:
          return {
            ...state,
            isSignout: true,
            userToken: null,
          };
        default:
            return state
      }
};

export default authentication;