import * as React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';


import { AuthContext } from './src/utils/authContext';
import { reducer, initialState } from './src/utils/reducer'

import SignInScreen from './src/screens/SignInScreen'
import MainScreen from './src/screens/MainScreen'
import SplashScreen from './src/screens/MainScreen'

const token_key = 'userToken'

const Stack = createStackNavigator();

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const saveToken = async (data) => {
    try {
      await AsyncStorage.setItem(token_key, data.username);
    } catch (error) {
      // Error saving data
    }
  }

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem(token_key);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        fetch('http://sales.hoplong.com/api/Api_NhanVien/LoginERP/' + data.username + '/' + data.password)
          .then((response) => response.json())
          .then((json) => {
            if (json.indexOf('thành công') >= 0) {
              saveToken(data)
              dispatch({ type: 'SIGN_IN', token: data.username });
            } else {
              Alert.alert('Đăng nhập không thành công', 'Tài khoản hoặc mật khẩu sai')
              return
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },
      signOut: async data => {
        await AsyncStorage.removeItem(token_key);
        dispatch({ type: 'SIGN_OUT' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Đăng nhập',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
                // User is signed in
                <Stack.Screen name="Main" component={MainScreen} />
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
