import * as React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { AuthContext } from './src/utils/authContext';
import { reducer, initialState } from './src/utils/reducer'

import SignInScreen from './src/screens/SignInScreen'
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'

const ACTIVE_TAB_COLOR = '#60C3FF'
const INACTIVE_TAB_COLOR = '#aaa'

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function MainScreen() {

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'heart' : 'heart';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'heart' : 'heart';
          }

          const myIcon = <Ionicons name="rocket" size={30} color="#900" />;

          // You can return any component that you like here!
          return myIcon;

        },
      })}
      tabBarOptions={{
        activeTintColor: '#547DD3',
        inactiveTintColor: 'gray',
        showIcon: true
      }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const saveToken = async (data) => {
    try {
      await AsyncStorage.setItem('userToken', data.username);
    } catch (error) {
      // Error saving data
    }
  }

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
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
        await AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
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
