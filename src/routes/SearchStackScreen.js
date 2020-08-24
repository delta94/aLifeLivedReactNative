import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './../screens/SearchScreen';

// Constants 
import { HEADER_OPTIONS } from './../appConstants';

const SearchStack = createStackNavigator();

export const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={SearchScreen} options={HEADER_OPTIONS} />
  </SearchStack.Navigator>
);