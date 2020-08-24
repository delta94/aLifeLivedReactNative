import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; 
import {connect} from 'react-redux';
import TrackPlayer from 'react-native-track-player';

// API 
import {getUserByID} from './../api/getRequests/getUser';

// Icon
import IconComponent from './../components/IconComponent';

// Services
import trackPlayerServices from '../services/services';

// Helpers
import {getToken} from './../helpers/asyncStorage';

// Redux Actions
import { setUserToken } from './../redux/actions/userActions';
import {userLoginSuccessful} from './../redux/actions/userActions';

// Stacks
import { ProfileStackScreen } from './ProfileStackScreen';
import { HomeStackScreen } from './HomeStackScreen';
import { NotificationsStackScreen } from './NotificationsStackScreen';
import { LoginAndSignUpStackScreen } from './AuthenticationStackScreen';
import { SearchStackScreen } from './SearchStackScreen';
import { StoryStackScreen } from './StoryStackScreen';

// Screens
import SplashScreen from './../screens/SplashScreen';

// Styles
import {COLOR, ICON_SIZE} from './../styles/styleHelpers';

const Tabs = createBottomTabNavigator();



const AppNavigation = (props) => {

  // The below is used for authentication
  const userToken = props.userReducer.id
  const [isLoading, setIsLoading] = useState(false);

  // sets up track player
  const trackPlayerOnLoad = async () => {
    setIsLoading(true);
    await TrackPlayer.setupPlayer({
      iosCategoryMode: 'spokenAudio',
      waitForBuffer: true
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
      const userData = await getUserByID(encryptedToken);
      return props.userLoginSuccessful(userData.data)
    } catch (error) {
      console.log(error);
    }
  };

  // The below handles the basic tab options 
  const tabDefaultOptions = {
    showLabel: false,
    tabBarVisible: false
  };

  useEffect(() => {
    trackPlayerOnLoad();
    getEncryptedToken();
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, []);

  // Below will be where we handle the loading splash screen.
  if (isLoading) {
    return <SplashScreen />;
  };
 
  // The below sets the icon for drawer
  function screenOptions (route) {
    const screenOptions = {
      tabBarIcon: ({focused}) => {
        switch (route.name) {
          case 'Home':
            return (
              <IconComponent
                name='home'
                type='font-awesome-5'
                size={ICON_SIZE.iconSizeMedium}
                color={focused ? COLOR.limeGreen : COLOR.grey}
              />
            );
          case 'Notifications':
            return (
              <IconComponent
                name='bell'
                type='font-awesome-5'
                solid={true}
                size={ICON_SIZE.iconSizeMedium}
                color={focused ? COLOR.limeGreen : COLOR.grey}
              />
            );
          case 'Create Story':
            return (
              <IconComponent
                name='microphone'
                type='font-awesome-5'
                size={ICON_SIZE.iconSizeMedium}
                color={focused ? COLOR.limeGreen : COLOR.grey}
              />
            );
          case 'Search':
            return (
              <IconComponent
                name='search'
                type='font-awesome-5'
                size={ICON_SIZE.iconSizeMedium}
                color={focused ? COLOR.limeGreen : COLOR.grey}
              />
            );
          case 'Profile':
            return (
              <IconComponent
                name='user'
                solid={true}
                type='font-awesome-5'
                size={ICON_SIZE.iconSizeMedium}
                color={focused ? COLOR.limeGreen : COLOR.grey}
              />
            );
          case 'SignUp': 
            const tabBarVisible = false
            return tabBarVisible
          default:
            break;
        }
      }
    };  

    return screenOptions        
  };

  return (
    <NavigationContainer>
        <Tabs.Navigator tabBarOptions={tabDefaultOptions} screenOptions={({route}) => screenOptions(route)}>
          <Tabs.Screen name="Home" component={HomeStackScreen} />
          <Tabs.Screen name="Notifications" component={userToken ? NotificationsStackScreen : LoginAndSignUpStackScreen} options={userToken ? {tabBarVisible: true} : {tabBarVisible: false}} />
          <Tabs.Screen name="Create Story" component={userToken ? StoryStackScreen : LoginAndSignUpStackScreen} options={{tabBarVisible: false}} /> 
          <Tabs.Screen name="Search" component={SearchStackScreen} />
          <Tabs.Screen name="Profile" component={userToken ? ProfileStackScreen : LoginAndSignUpStackScreen} options={userToken ? {tabBarVisible: true} : {tabBarVisible: false}} />
        </Tabs.Navigator>
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
    userLoginSuccessful: (userData) => dispatch(userLoginSuccessful(userData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);