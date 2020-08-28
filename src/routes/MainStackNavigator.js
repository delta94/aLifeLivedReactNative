import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import TrackPlayer from 'react-native-track-player';

// API 
import { getUserByID, getUserStories } from './../api/getRequests/getUser';

// Services
import trackPlayerServices from '../services/services';

// Helpers
import { getToken } from './../helpers/asyncStorage';

// Redux Actions
import { setUserToken, setUserStories } from './../redux/actions/userActions';
import { userLoginSuccessful } from './../redux/actions/userActions';

// Screens
import SplashScreen from './../screens/SplashScreen';

// Navigators
import TabsNavigator from './TabsStackNavigator';
import ScreenNavigator from './ScreenStackNavigator';
import AuthNavigator from './AuthStackNavigator';

const RootStack = createStackNavigator();

const MainStackNavigator = ({userReducer, userLoginSuccessful, setUserToken, setUserStories}) => {

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

  const onLoad = async () => {
    // Function firing twice on load, need to only fire once.
    try {
      const encryptedToken = await getToken();
      setUserToken(encryptedToken);
      const userData = await getUserByID(encryptedToken);
      const userStories = await getUserStories(encryptedToken);
      const authToken = userData.headers.authtoken;
      setUserStories(userStories.data);
      return userLoginSuccessful(userData.data, authToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    trackPlayerOnLoad();
    onLoad();
  }, []);

  // Below will be where we handle the loading splash screen.
  if (isLoading) {
    return <SplashScreen />;
  };

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="tabsNavigator"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="screensNavigator"
        component={ScreenNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="authNavigator"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserToken: (encryptedToken) => dispatch(setUserToken(encryptedToken)),
    userLoginSuccessful: (userData, authToken) => dispatch(userLoginSuccessful(userData, authToken)),
    setUserStories: (userStories) => dispatch(setUserStories(userStories))
  };
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainStackNavigator);