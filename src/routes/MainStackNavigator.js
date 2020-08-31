import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Navigators
import TabsNavigator from './TabsStackNavigator';
import ScreenNavigator from './ScreenStackNavigator';
import AuthNavigator from './AuthStackNavigator';

const RootStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="tabsNavigator"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="screensNavigator"
        component={ScreenNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="authNavigator"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default MainStackNavigator;