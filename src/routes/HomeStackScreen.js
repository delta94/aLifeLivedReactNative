import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from './../screens/HomeScreen';
import StoryViewScreen from './../screens/StoryViewScreen';

// Constants 
import { HEADER_OPTIONS } from './../appConstants';

// Styles
import { COLOR } from './../styles/styleHelpers';

const HomeStack = createStackNavigator();

export const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={HEADER_OPTIONS}
    />
    <HomeStack.Screen
      name="View Story"
      component={StoryViewScreen}
      options={{ cardStyle: { backgroundColor: COLOR.grey }, headerShown: false }}
    />
  </HomeStack.Navigator>
);