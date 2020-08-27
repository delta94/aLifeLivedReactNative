import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Stacks
import { LoginAndSignUpStackScreen } from './AuthenticationStackScreen';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="authStack" component={LoginAndSignUpStackScreen} />
    </Stack.Navigator>
  )
};

export default AuthNavigator;