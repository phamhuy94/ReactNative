import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

export const getToken = (token_key) => async dispatch => {
  const userToken = null;

  try {
    userToken = await AsyncStorage.getItem(token_key);
  } catch (e) {
    // Restoring token failed
  }
  dispatch({ type: 'RESTORE_TOKEN', token: userToken });
}

export const login = (username, password) => async dispatch => {
  const url = 'http://sales.hoplong.com/api/Api_NhanVien/LoginERP/' + username + '/' + password;
  const saveToken = async () => {
    try {
      await AsyncStorage.setItem(token_key, username);
    } catch (error) {
      // Error saving data
    }
  }
  axios.get(url)
    .then(function (response) {
      if (response.data.indexOf('thành công') >= 0) {
        saveToken(data)
        dispatch({ type: 'SIGN_IN', token: username });
      } else {
        Alert.alert('Đăng nhập không thành công', 'Tài khoản hoặc mật khẩu sai')
        return
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem(token_key);
  dispatch({ type: 'SIGN_OUT' });
}