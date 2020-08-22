import React, {useState} from 'react';
import {View} from 'react-native';
import {SearchBar} from 'react-native-elements';

// Styles
import styles from './../styles/screens/HomeScreen';

const SearchScreen = ({navigation}) => {

  const [searchValue, setSearchValue] = useState("");

  const updateSearch = () => {

  }
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SearchBar 
          placeholder="Try searching for...war stories, sporting achievements"
          onChangeText={updateSearch}
          value={searchValue}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
