import React, {useState, useCallback} from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import {useFocusEffect} from '@react-navigation/native';

// TrackPlayer
import TrackPlayer from 'react-native-track-player';
import trackPlayerServices from '../services/services';

// API
import {getUserByID, getUserStories} from './../api/getRequests/getUser';

// Redux Actions
import { setUserToken, setUserStories } from './../redux/actions/userActions';
import { userLoginSuccessful } from './../redux/actions/userActions';

// Helpers
import { getToken } from './../helpers/asyncStorage';
import { tabBarIcons } from './helpers/tabBarOptions';

// Stacks
import { ProfileStackScreen, HomeStackScreen, NotificationsStackScreen, SearchStackScreen, StoryStackScreen } from './NavigationStacks';

const Tabs = createBottomTabNavigator();

function TabsNavigator({
  userReducer,
  navigation,
  userLoginSuccessful,
  setUserToken,
  setUserStories,
}) {

  const [isPlayerSetup, setIsPlayerSetup] = useState(false);

  // // sets up track player
  // const trackPlayerOnLoad = async () => {
  //   await TrackPlayer.setupPlayer({
  //     iosCategoryMode: 'spokenAudio',
  //     waitForBuffer: true,
  //   }).then(() => {
  //     console.log('Player is set up');
  //   });

  //   TrackPlayer.registerPlaybackService(() => trackPlayerServices);
  //   return setIsPlayerSetup(true);
  // };

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

  useFocusEffect (
    useCallback(() => {
      // if (!isPlayerSetup) {
      //   trackPlayerOnLoad();
      // };
      
      onLoad();
    }, []),
  );

  // The below handles the basic tab options
  const tabDefaultOptions = {
    showLabel: false,
    tabBarVisible: false,
  };

  const handleNotLoggedIn = (event) => {
    if (!userReducer.id) {
      event.preventDefault();
      return navigation.navigate('authNavigator', {
        screen: 'authStack',
        params: {
          screen: 'Login',
        },
      });
    }
  };

  return (
    <Tabs.Navigator
      tabBarOptions={tabDefaultOptions}
      screenOptions={({route}) => tabBarIcons(route)}>
      <Tabs.Screen name="Home" component={HomeStackScreen} />
      <Tabs.Screen
        name="Notifications"
        component={NotificationsStackScreen}
        listeners={() => ({tabPress: (event) => handleNotLoggedIn(event)})}
      />
      <Tabs.Screen
        name="Create Story"
        component={StoryStackScreen}
        options={{tabBarVisible: false}}
        listeners={() => ({tabPress: (event) => handleNotLoggedIn(event)})}
      />
      <Tabs.Screen name="Search" component={SearchStackScreen} />
      <Tabs.Screen
        name="Profile"
        component={ProfileStackScreen}
        listeners={() => ({tabPress: (event) => handleNotLoggedIn(event)})}
      />
    </Tabs.Navigator>
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

export default connect(mapStateToProps, mapDispatchToProps)(TabsNavigator);