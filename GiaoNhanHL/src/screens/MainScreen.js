import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './HomeScreen'
import DetailsScreen from './DetailsScreen';

const Stack = createStackNavigator();

const MainScreen = ({ navigation }) => {

    return (
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Chi tiết nhân viên" component={DetailsScreen} />
      </Stack.Navigator>
    );
  }

  export default MainScreen;