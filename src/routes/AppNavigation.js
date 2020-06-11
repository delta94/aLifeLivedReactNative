import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; 
import AntIcons from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

// Screens
import LoginScreen from './../screens/LoginScreen';
import SignUpScreen from './../screens/SignUpScreen';
import HomeScreen from './../screens/HomeScreen';
import SplashScreen from './../screens/SplashScreen';
import ProfileScreen from './../screens/ProfileScreen';
import NotificationsScreen from './../screens/NotificationsScreen';
import StoryCreationScreen from './../screens/StoryCreationScreen';
import SearchScreen from './../screens/SearchScreen';

// Styles

const Tabs = createBottomTabNavigator();

// Stack Navigators
const HomeStack = createStackNavigator();
const LoginAndSignUpStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const StoryCreationStack = createStackNavigator();
const SearchStack = createStackNavigator();

// Icons


// The below are stacks they can hold a number of screens. We're using this because of the tab.
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

const NotificationsStackScreen = () => (
  <NotificationsStack.Navigator>
    <NotificationsStack.Screen
      name="Notifications"
      component={NotificationsScreen}
    />
  </NotificationsStack.Navigator>
);

const StoryCreationStackScreen = () => (
  <StoryCreationStack.Navigator>
    <StoryCreationStack.Screen name="Create Story" component={StoryCreationScreen} />
  </StoryCreationStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={SearchScreen} />
  </SearchStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const LoginAndSignUpStackScreen = () => (
  <LoginAndSignUpStack.Navigator>
    <LoginAndSignUpStack.Screen 
      name="Login" 
      component={LoginScreen} 
    />
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
  };

  return (
    <NavigationContainer>
      {userToken ? (
        <Tabs.Navigator>
          <Tabs.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarIcon: () => (
                <AntIcons name="home" size={30} color="black" />
              ),
            }}
          />
          <Tabs.Screen
            name="Notifications"
            component={NotificationsStackScreen}
            options={{
              tabBarIcon: () => (
                <IonIcons name="ios-notifications" size={30} color="black" />
              ),
            }}
          />
          <Tabs.Screen
            name="Create Story"
            component={StoryCreationStackScreen}
            options={{
              tabBarIcon: () => (
                <FontAwesomeIcons name="microphone" size={30} color="black" />
              ),
            }}
          />
          <Tabs.Screen
            name="Search"
            component={SearchStackScreen}
            options={{
              tabBarIcon: () => (
                <AntIcons name="search1" size={30} color="black" />
              ),
            }}
          />
          <Tabs.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
              tabBarIcon: () => (
                <AntIcons name="user" size={30} color="black" />
              )
            }}
          />
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

