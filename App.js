import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


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
    <View style={styles.container}>
      <AppNavigation />
    </View>
  );
};

export default App;