import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';



// Screens
import HomeScreen from './../screens/HomeScreen';
import LoginScreen from './../screens/LoginScreen';
import SignUpScreen from './../screens/SignUpScreen';
import NotificationsScreen from './../screens/NotificationsScreen';
import ProfileScreen from './../screens/ProfileScreen';
import SettingsScreen from './../screens/SettingsScreen';
import StoryCreationScreen from './../screens/StoryCreationScreen';
import StoryRecordingScreen from './../screens/StoryRecordingScreen';
import StoryViewScreen from './../screens/StoryViewScreen';
import SearchScreen from './../screens/SearchScreen';

// Constants 
import { DEFAULT_HEADER_OPTION, CREATE_STORY_HEADER, PROFILE_HEADER } from './helpers/headerOptions';

// Styles
import { COLOR } from './../styles/styleHelpers';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AuthStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const StoryStack = createStackNavigator();
const ViewStoryStack = createStackNavigator();
const SearchStack = createStackNavigator();

export const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

export const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => DEFAULT_HEADER_OPTION(navigation)}
    />
  </HomeStack.Navigator>
);

export const NotificationsStackScreen = () => (
  <NotificationsStack.Navigator>
    <NotificationsStack.Screen 
      name="Notifications" 
      component={NotificationsScreen} 
      options={({ navigation }) => DEFAULT_HEADER_OPTION(navigation)} 
    />
  </NotificationsStack.Navigator>
);

export const ProfileStackScreen = (props) => {
  return (
    <ProfileStack.Navigator screenOptions={(route) => PROFILE_HEADER(route)}>
      <ProfileStack.Screen 
        name="Profile" 
        component={ProfileScreen} 
      />
      <ProfileStack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ headerLeft: null }} 
      />
    </ProfileStack.Navigator>
  )
};

export const StoryStackScreen = (props) => (
  <StoryStack.Navigator screenOptions={{ headerShown: true }}>
    <StoryStack.Screen 
      name="Create Story" 
      component={StoryCreationScreen} 
      initialParams={{ step: 0 }} 
      options={(props) => CREATE_STORY_HEADER(props)} 
    />
    <StoryStack.Screen 
      name="Record Story" 
      component={StoryRecordingScreen} 
      options={{headerShown: false}}
    />
  </StoryStack.Navigator>
);

export const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen 
      name="Search" 
      component={SearchScreen} 
      options={({ navigation }) => DEFAULT_HEADER_OPTION(navigation)} 
    />
  </SearchStack.Navigator>
);

export const ViewStoryStackScreen = () => (
  <ViewStoryStack.Navigator screenOptions={{ headerShown: false }}>
    <ViewStoryStack.Screen
      name="View Story"
      component={StoryViewScreen}
      options={{ cardStyle: { backgroundColor: COLOR.grey }, headerShown: false }}
    />
  </ViewStoryStack.Navigator>
);