import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

// Redux Actions
import { setUserToken, setUserStories } from './../redux/actions/userActions';
import { userLoginSuccessful } from './../redux/actions/userActions';

// Helpers
import { tabBarIcons } from './helpers/tabBarOptions';

// Stacks
import { ProfileStackScreen, HomeStackScreen, NotificationsStackScreen, SearchStackScreen, StoryStackScreen } from './NavigationStacks';

const Tabs = createBottomTabNavigator();

function TabsNavigator({userReducer, navigation}) {

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
          screen: 'Login'
        }
      });
    }
  };

  return (
    <Tabs.Navigator tabBarOptions={tabDefaultOptions} screenOptions={({ route }) => tabBarIcons(route)}>
      <Tabs.Screen name="Home" component={HomeStackScreen} />
      <Tabs.Screen name="Notifications" component={NotificationsStackScreen} listeners={() => ({ tabPress: event => handleNotLoggedIn(event) })}/>
      <Tabs.Screen name="Create Story" component={StoryStackScreen} options={{tabBarVisible: false}}listeners={() => ({ tabPress: event => handleNotLoggedIn(event)})}/>
      <Tabs.Screen name="Search" component={SearchStackScreen} />
      <Tabs.Screen name="Profile" component={ProfileStackScreen} listeners={() => ({ tabPress: event => handleNotLoggedIn(event)})} />
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