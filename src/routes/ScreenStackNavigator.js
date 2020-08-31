import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Stacks
import { ViewStoryStackScreen } from './NavigationStacks';

const Stack = createStackNavigator();

function ScreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="storyStack" component={ViewStoryStackScreen} />
    </Stack.Navigator>
  )
};

export default ScreenNavigator;