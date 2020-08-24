import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import LoginScreen from './../screens/LoginScreen';
import SignUpScreen from './../screens/SignUpScreen';

const LoginAndSignUpStack = createStackNavigator();

export const LoginAndSignUpStackScreen = () => (
  <LoginAndSignUpStack.Navigator screenOptions={{ headerShown: false }}>
    <LoginAndSignUpStack.Screen name="Login" component={LoginScreen} />
    <LoginAndSignUpStack.Screen name="SignUp" component={SignUpScreen} />
  </LoginAndSignUpStack.Navigator>
);