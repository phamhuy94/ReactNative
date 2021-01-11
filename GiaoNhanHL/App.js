import React from 'react';
import store from './src/redux'
import { Provider} from 'react-redux'

import Authentication from './src/screens/Authentication/AuthenticationScreen'

export default function App() { 
  return (
    <Provider store={store}>
      <Authentication></Authentication>
    </Provider>
  );
}
