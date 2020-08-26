import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; 
import { createStackNavigator } from '@react-navigation/stack';
import {connect} from 'react-redux';
import TrackPlayer from 'react-native-track-player';

// API 
import {getUserByID} from './../api/getRequests/getUser';

// Services
import trackPlayerServices from '../services/services';

// Helpers
import {screenOptions} from './../helpers/routeScreenOptions';
import {getToken} from './../helpers/asyncStorage';

// Redux Actions
import {setUserToken} from './../redux/actions/userActions';
import {userLoginSuccessful} from './../redux/actions/userActions';

// Stacks
import { ProfileStackScreen } from './ProfileStackScreen';
import { HomeStackScreen } from './HomeStackScreen';
import { NotificationsStackScreen } from './NotificationsStackScreen';
import { LoginAndSignUpStackScreen } from './AuthenticationStackScreen';
import { SearchStackScreen } from './SearchStackScreen';
import { StoryStackScreen, ViewStoryStackScreen } from './StoryStackScreen';

// Screens
import SplashScreen from './../screens/SplashScreen';

const Tabs = createBottomTabNavigator();
const RootStack = createStackNavigator();

const AppNavigation = ({userReducer, userLoginSuccessful, setUserToken}) => {
  // The below is used for authentication
  // const userToken = props.userReducer.id;
  const token = userReducer.id;
  const [isLoading, setIsLoading] = useState(false);

  // sets up track player
  const trackPlayerOnLoad = async () => {
    setIsLoading(true);
    await TrackPlayer.setupPlayer({
      iosCategoryMode: 'spokenAudio',
      waitForBuffer: true,
    }).then(() => {
      console.log('Player is set up');
    });

    TrackPlayer.registerPlaybackService(() => trackPlayerServices);
    return setIsLoading(false);
  };

  const getEncryptedToken = async () => {
    // Function firing twice on load, need to only fire once.
    try {
      const encryptedToken = await getToken();
      setUserToken(encryptedToken);
      const userData = await getUserByID(encryptedToken);
      const authToken = userData.headers.authtoken;
      return userLoginSuccessful(userData.data, authToken);
    } catch (error) {
      console.log(error);
    }
  };

  // The below handles the basic tab options
  const tabDefaultOptions = {
    showLabel: false,
    tabBarVisible: false,
  };

  useEffect(() => {
    trackPlayerOnLoad();
    getEncryptedToken();
  }, []);

  // Below will be where we handle the loading splash screen.
  if (isLoading) {
    return <SplashScreen />;
  }

  const MainStackNavigator = () => {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name="Tabs Navigator"
          component={TabsNavigator}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="View Story"
          component={ViewStoryStackScreen}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    );
  };

  const TabsNavigator = () => {
    return (
      <Tabs.Navigator
        tabBarOptions={tabDefaultOptions}
        screenOptions={({route}) => screenOptions(route)}>
        <Tabs.Screen name="Home" component={HomeStackScreen} />
        <Tabs.Screen
          name="Notifications"
          component={
            token ? NotificationsStackScreen : LoginAndSignUpStackScreen
          }
          options={token ? {tabBarVisible: true} : {tabBarVisible: false}}
        />
        <Tabs.Screen
          name="Create Story"
          component={token ? StoryStackScreen : LoginAndSignUpStackScreen}
          options={{tabBarVisible: false}}
        />
        <Tabs.Screen name="Search" component={SearchStackScreen} />
        <Tabs.Screen
          name="Profile"
          options={token ? {tabBarVisible: true} : {tabBarVisible: false}}
          initialParams={userReducer}>
          {(props) =>
            token ? (
              <ProfileStackScreen {...props} />
            ) : (
              <LoginAndSignUpStackScreen />
            )
          }
        </Tabs.Screen>
      </Tabs.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserToken: (encryptedToken) => dispatch(setUserToken(encryptedToken)),
    userLoginSuccessful: (userData, authToken) => dispatch(userLoginSuccessful(userData, authToken))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);