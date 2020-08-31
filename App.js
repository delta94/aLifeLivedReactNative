import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {View} from 'react-native'
import { NativeModules } from 'react-native';

// Redux Store
import store from './src/redux/store';

// Navigation
import AppNavigation from './src/routes/AppNavigation';

// Style
import styles from './src/styles/App'

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppNavigation />
      </View>
    </Provider>
  );
};

export default App;