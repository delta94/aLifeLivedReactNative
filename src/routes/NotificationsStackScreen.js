import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import NotificationsScreen from './../screens/NotificationsScreen';

const NotificationsStack = createStackNavigator();

export const NotificationsStackScreen = () => (
  <NotificationsStack.Navigator>
    <NotificationsStack.Screen name="Notifications" component={NotificationsScreen} />
  </NotificationsStack.Navigator>
);
