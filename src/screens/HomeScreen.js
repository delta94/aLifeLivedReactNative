import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList, TouchableOpacity, NativeModules} from 'react-native';
import Config from "react-native-config";
// Actions
import { saveAllStories } from './../redux/actions/allCollections';
import { addBookMarkedStory, removeBookMarkedStory } from './../redux/actions/userActions';

// API
import {getAllPublicStories} from './../api/getRequests/getStory';
import { bookMarkStory, unBookMarkStory } from './../api/putRequests/user';

// Components
import StoryCardComponent from './../components/StoryCardComponent';

// Styles
import styles from './../styles/screens/HomeScreen';

const HomeScreen = ({
  navigation,
  userReducer,
  allCollectionsReducer,
  saveAllStories,
  addBookMarkedStory,
  removeBookMarkedStory,
}) => {
  const env = NativeModules.RNConfig.env;
  const ProdChecker = NativeModules.ProdChecker;
  const [refreshing, setRefreshing] = useState(false);
  const [userLikedStories] = useState(userReducer.likedStories);

  ProdChecker.isTestflight().then(val => {
      console.log("HELLO", val);
  });

  const onLoad = async () => {
    setRefreshing(true);
    const allStories = await getAllPublicStories();
    if (allStories.status === 200) {
      saveAllStories(allStories.data);
      return setRefreshing(false);
    } else {
      console.log('ERROR');
      return setRefreshing(false);
    }
  };

  useEffect(() => {
    onLoad();
  }, [userLikedStories]);

  // Handles when the user scrolls to the top of FlatList and refreshes
  const handleRefresh = () => {
    setRefreshing(true);
    return onLoad();
  };

  // Handles when the user clicks a story
  const onStoryPress = (storyID, hasUserBookMarkedStory, hasUserLikedStory) => {
    const userID = userReducer.id;

    // Navigates to the Screens navigator then storyStack then to view Story
    navigation.navigate('screensNavigator', {
      screen: 'storyStack',
      params: {
        screen: 'View Story',
        params: { storyID, userID, hasUserBookMarkedStory, hasUserLikedStory}
      },
    });
  };

  // Handle when user clicks on bookmark button
  const onBookmarkPress = async (hasUserBookMarkedStory, storyID) => {
    // If user is not logged in
    if (!userReducer.id) {
      return navigation.navigate('authNavigator', {
        screen: 'authStack',
        params: {
          screen: 'Login'
        }
      });
    }

    // If already bookmarked
    if (hasUserBookMarkedStory) {
      const response = await unBookMarkStory(storyID, userReducer.id);
      response.status === 200
        ? removeBookMarkedStory(storyID)
        : console.log('ERROR');
    } else {
      const response = await bookMarkStory(storyID, userReducer.id);
      response.status === 200
        ? addBookMarkedStory(storyID)
        : console.log('ERROR');
    }
  };

  // Renders each story with the FlatList
  const renderStories = ({item, index}) => {
    const hasUserLikedStory = userReducer.likedStories
      ? userReducer.likedStories.includes(item._id)
      : false;
    const hasUserBookMarkedStory = userReducer.bookMarks
      ? userReducer.bookMarks.includes(item._id)
      : false;

    return (
      <TouchableOpacity onPress={() => onStoryPress(item._id, hasUserBookMarkedStory, hasUserLikedStory)} style={styles.storyCard} id={index}>
        <StoryCardComponent
          title={item.title}
          description={item.description}
          tags={item.tags}
          avatarURL={item.interviewer.avatarURL}
          likes={item.likes}
          hasUserLikedStory={hasUserLikedStory}
          hasUserBookMarkedStory={hasUserBookMarkedStory}
          onBookMarkPress={() =>
            onBookmarkPress(hasUserBookMarkedStory, item._id)
          }
          id={item._id}
        />
      </TouchableOpacity>
    );
  };

  // Handle when there is no data to displaying 
  const onNoData = () => {
    return (
      <View>
        <Text style={styles.headerText}>This looks blank...try liking, bookmarking or creating amazing stories!</Text>
      </View>
    )
  };
  
  return (
    <View style={styles.container}>
      <Text>{Config.BACKEND_BASE_ROUTE}</Text>
      <View style={styles.contentContainer}>
        <FlatList
          ListHeaderComponent={() => {
            return <Text style={styles.headerText}>Popular</Text>;
          }}
          data={allCollectionsReducer.stories}
          renderItem={renderStories}
          keyExtractor={(item) => item._id}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={onNoData()}
        />
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
    allCollectionsReducer: state.allCollectionsReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveAllStories: (stories) => dispatch(saveAllStories(stories)),
    addBookMarkedStory: (storyID) => dispatch(addBookMarkedStory(storyID)),
    removeBookMarkedStory: (storyID) => dispatch(removeBookMarkedStory(storyID)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
