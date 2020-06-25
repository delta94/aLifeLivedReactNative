import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; 

// Icon imports
import AntIcons from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
import {COLOR, ICON_SIZE} from './../styles/styleHelpers';

const Tabs = createBottomTabNavigator();

// Stack Navigators
const HomeStack = createStackNavigator();
const LoginAndSignUpStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const StoryCreationStack = createStackNavigator();
const SearchStack = createStackNavigator();

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

  // TODO: Handle loading of the application.
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState('12345678');

  // The below handles the basic tab options 
  const tabDefaultOptions = {
    showLabel: false,
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, []);

  // Below will be where we handle the loading splash screen.
  if (isLoading) {
    return <SplashScreen />;
  };

  return (
    <NavigationContainer>
      {userToken ? (
        <Tabs.Navigator 
        tabBarOptions={tabDefaultOptions} 
        screenOptions={({route}) => ({
            tabBarIcon: ({focused}) => {
              let iconName;

              switch (route.name) {
                case "Home":
                  iconName = focused ? 'home' : 'home-outline';
                  return (
                    <MaterialCommunityIcons
                      name={iconName}
                      size={ICON_SIZE.iconSizeMedium}
                      color={COLOR.grey}
                    />
                  ); 
                case "Notifications":
                  iconName = focused ? 'bell' : 'bell-outline';
                  return (
                    <MaterialCommunityIcons
                      name={iconName}
                      size={ICON_SIZE.iconSizeMedium}
                      color={COLOR.grey}
                    />
                  ); 
                case "Create Story":
                  iconName = focused ? 'microphone' : 'microphone-outline';
                  return (
                    <MaterialCommunityIcons
                      name={iconName}
                      size={ICON_SIZE.iconSizeMedium}
                      color={COLOR.grey}
                    />
                  ); 
                case "Search":
                  iconName = focused ? 'md-search' : 'ios-search';
                  return (
                    <IonIcons
                      name={iconName}
                      size={ICON_SIZE.iconSizeMedium}
                      color={COLOR.grey}
                    />
                  ); 
                case "Profile":
                  iconName = focused ? 'user' : 'user-o';
                  return (
                    <FontAwesomeIcons
                      name={iconName}
                      size={ICON_SIZE.iconSizeMedium}
                      color={COLOR.grey}
                    />
                  ); 
                default:
                  break;
              }
            }
          })}
        >
          <Tabs.Screen
            name="Home"
            component={HomeStackScreen}
          />
          <Tabs.Screen
            name="Notifications"
            component={NotificationsStackScreen}
          />
          <Tabs.Screen
            name="Create Story"
            component={StoryCreationStackScreen}
          />
          <Tabs.Screen
            name="Search"
            component={SearchStackScreen}
          />
          <Tabs.Screen
            name="Profile"
            component={ProfileStackScreen}
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

