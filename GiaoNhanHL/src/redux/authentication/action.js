import AsyncStorage from '@react-native-community/async-storage';
import {login} from '../../api/authentication/authentication'

const token_key = 'userToken';
const ho_ten = 'hoTen';
const truc_thuoc = 'trucThuoc';

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
  const saveToken = async () => {
    try {
      await AsyncStorage.setItem(token_key, data.username);
    } catch (error) {
      
    }
  }
  return async (dispatch) => {
    dispatch({ type: BEFORE_SIGN_IN});
    try {
      const response = await login(data);
      if(response.notification.indexOf('thành công') >= 0){
        saveToken(data)
        dispatch({ type: SIGN_IN, token: data.username });
      }else{
        dispatch({ type: SIGN_IN_FAILED,alertText:response.notification});
      }     
    } catch (e) {
      console.log(e);
    }
  };  
}

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem(token_key);
  dispatch({ type: SIGN_OUT });
}