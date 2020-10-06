import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/redux'
import { Provider} from 'react-redux'

import Authentication from './src/screens/AuthenticationScreen'

const Stack = createStackNavigator();

export default function App() { 
  return (
    <Provider store={store}>
      <Authentication></Authentication>
    </Provider>
  );
}
