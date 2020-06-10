import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native'

// Navigation
import AppNavigation from './src/routes/AppNavigation';

// Style
import styles from './src/styles/App'

const App = () => {
  return (
    <View style={styles.container}>
      <AppNavigation />
    </View>
  );
};

export default App;