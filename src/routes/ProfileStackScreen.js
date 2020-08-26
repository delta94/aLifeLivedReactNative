import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import ProfileScreen from './../screens/ProfileScreen';
import SettingsScreen from './../screens/SettingsScreen';

// Components
import HeaderProfileComponent from './../components/HeaderProfileComponent';

// Styles
import { COLOR } from './../styles/styleHelpers';

const ProfileStack = createStackNavigator();

export const ProfileStackScreen = (props) => (
  <ProfileStack.Navigator 
    screenOptions={({ route, navigation }) => ({
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: COLOR.grey,
          shadowOffset: { height: 0 },
          height: 200
        },
        cardStyle: { backgroundColor: COLOR.grey },
        headerTitle: () => <HeaderProfileComponent {...props} />,
      })}
    >

    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{headerLeft: null}}
    />
  </ProfileStack.Navigator>
);
