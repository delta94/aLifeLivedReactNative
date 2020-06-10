import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; 

// Screens
import LoginScreen from './../screens/LoginScreen';
import SignUpScreen from './../screens/SignUpScreen';
import HomeScreen from './../screens/HomeScreen';
import SplashScreen from './../screens/SplashScreen';

// Styles

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const LoginAndSignUpStack = createStackNavigator();

// The below are stacks they can hold a number of screens. We're using this because of the tab.
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

const LoginAndSignUpStackScreen = () => (
  <LoginAndSignUpStack.Navigator>
    <LoginAndSignUpStack.Screen name="Login" component={LoginScreen} />
    <LoginAndSignUpStack.Screen 
      name="SignUp" 
      component={SignUpScreen} 
    />
  </LoginAndSignUpStack.Navigator>
);

const AppNavigation = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState('12345678');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {userToken ? (
        <Tabs.Navigator>
          <Tabs.Screen name="Login" component={LoginAndSignUpStackScreen} />
          <Tabs.Screen name="Home" component={HomeStackScreen} />
        </Tabs.Navigator>
      ) : (
        <Tabs.Navigator>
          <Tabs.Screen name="Login" component={LoginAndSignUpStackScreen} />
          <Tabs.Screen name="Home" component={HomeStackScreen} />
        </Tabs.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;

