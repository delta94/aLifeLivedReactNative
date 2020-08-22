import React from 'react';
import {View, Text, Button} from 'react-native';
import {SearchBar} from 'react-native-elements';

// Styles
import styles from './../styles/screens/HomeScreen';

const SearchScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SearchBar />
      </View>
    </View>
  );
};

export default SearchScreen;
