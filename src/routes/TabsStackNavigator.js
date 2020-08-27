import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

// Helpers
import { screenOptions } from './../helpers/routeScreenOptions';

// Navigator 
import AuthNavigator from './AuthStackNavigator';

// Stacks
import { ProfileStackScreen } from './ProfileStackScreen';
import { HomeStackScreen } from './HomeStackScreen';
import { NotificationsStackScreen } from './NotificationsStackScreen';
import { SearchStackScreen } from './SearchStackScreen';
import { StoryStackScreen } from './StoryStackScreen';

const Tabs = createBottomTabNavigator();

function TabsNavigator ({userReducer, navigation}) {

  console.log(userReducer);
  // The below handles the basic tab options
  const tabDefaultOptions = {
    showLabel: false,
    tabBarVisible: false,
  };

  const handleNotLoggedIn = () => {
    return navigation.navigate('authNavigator', {
      screen: 'authStack',
      params: {
        screen: 'Login'
      }
    });
  }

  return (
    <Tabs.Navigator tabBarOptions={tabDefaultOptions} screenOptions={({ route }) => screenOptions(route)}>
      <Tabs.Screen name="Home" component={HomeStackScreen} />
      <Tabs.Screen name="Notifications" component={userReducer.id ? NotificationsStackScreen : AuthNavigator} />
      <Tabs.Screen name="Create Story" component={userReducer.id ? StoryStackScreen : AuthNavigator} />
      <Tabs.Screen name="Search" component={SearchStackScreen} />
      <Tabs.Screen name="Profile" component={ProfileStackScreen} initialParams={userReducer} />
    </Tabs.Navigator>
  );
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer
  }
};

export default connect(mapStateToProps)(TabsNavigator);