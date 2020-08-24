import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import StoryCreationScreen from './../screens/StoryCreationScreen';
import StoryRecordingScreen from './../screens/StoryRecordingScreen';
import StoryViewScreen from './../screens/StoryViewScreen';

// Styles
import { COLOR } from './../styles/styleHelpers';

const StoryStack = createStackNavigator();

export const StoryStackScreen = () => (
  <StoryStack.Navigator screenOptions={{ headerShown: false }}>
    <StoryStack.Screen name="Create Story" component={StoryCreationScreen} initialParams={{ step: 0 }} options={{ cardStyle: { backgroundColor: COLOR.white } }} />
    <StoryStack.Screen name="Record Story" component={StoryRecordingScreen} />
    <StoryStack.Screen
      name="View Story"
      component={StoryViewScreen}
      options={{ cardStyle: { backgroundColor: COLOR.grey }, headerShown: false }}
    />
  </StoryStack.Navigator>
);
