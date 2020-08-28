import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Stacks
import { AuthStackScreen } from './NavigationStacks';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="authStack" component={AuthStackScreen} />
    </Stack.Navigator>
  )
};

export default AuthNavigator;