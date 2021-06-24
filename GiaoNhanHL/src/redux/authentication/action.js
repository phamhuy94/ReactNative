import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../../api/authentication/authentication'
import  message  from "../mesage";

const token_key = 'userToken';
const ma_cong_ty = 'maCongTy';

export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const BEFORE_SIGN_IN = 'BEFORE_SIGN_IN';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const SIGN_OUT = 'SIGN_OUT';

export const getToken = () => async dispatch => { 
  const userToken = await AsyncStorage.getItem(token_key);

  return dispatch({ type: RESTORE_TOKEN, token: userToken });
}

export const _login = (data) => {  
  const saveToken = async (response) => {
    try {
      await AsyncStorage.setItem(token_key, response.user.USERNAME);
      await AsyncStorage.setItem(ma_cong_ty, response.user.MA_CONG_TY);
    } catch (error) {
      
    }
  }
  return async (dispatch) => {
    dispatch({ type: BEFORE_SIGN_IN});
    try {
      const response = await login(data);
      if(response.notification.indexOf('thành công') >= 0){
        saveToken(response);
        message('Đăng nhập thành công', 200);
        dispatch({ type: SIGN_IN, token: response.user.USERNAME });
      }else{
        message(response.notification, 200);
        dispatch({ type: SIGN_IN_FAILED,alertText:response.notification});
      }     
    } catch (e) {
      console.log(e);
    }
  };  
}

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem(token_key);
  await AsyncStorage.removeItem(ma_cong_ty);
  message('Đăng xuất thành công', 200);
  dispatch({ type: SIGN_OUT });
}