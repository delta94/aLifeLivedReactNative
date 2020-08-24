import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import ProfileScreen from './../screens/ProfileScreen';

// Components
import { HeaderProfileComponent } from './../components/HeaderProfileComponent';

// Styles
import { COLOR } from './../styles/styleHelpers';

const ProfileStack = createStackNavigator();

export const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      initialParams={{ user: "MAX" }}
      options={({ route }) => ({
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: COLOR.grey,
          shadowOffset: { height: 0 },
          height: 200
        },
        headerTitle: props => <HeaderProfileComponent route={route} {...props} />,
      })}
    />
  </ProfileStack.Navigator>
);
