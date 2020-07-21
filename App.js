import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {View} from 'react-native'
import { NativeModules } from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Redux Store
import store from './src/redux/store';

// Navigation
import AppNavigation from './src/routes/AppNavigation';

// Style
import styles from './src/styles/App'

// Load fonts
MaterialCommunityIcons.loadFont();
AntDesignIcon.loadFont();
IonIcons.loadFont();
FontAwesomeIcons.loadFont();

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