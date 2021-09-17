/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Starter from './src/Components/Starter';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/reducers/reducer';



const App = () => {
  const store = createStore(reducer)
  return (
    <Provider store={store}>
      <Starter />
    </Provider>
  );
};

export default App;
