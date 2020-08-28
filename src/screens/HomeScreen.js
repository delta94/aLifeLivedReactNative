import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

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
  const [refreshing, setRefreshing] = useState(false);
  const [userLikedStories, setUserLikedStories] = useState(userReducer.likedStories);

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

  const handleRefresh = () => {
    setRefreshing(true);
    return onLoad();
  };

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

  const renderStories = ({item}) => {
    const hasUserLikedStory = userReducer.likedStories
      ? userReducer.likedStories.includes(item._id)
      : false;
    const hasUserBookMarkedStory = userReducer.bookMarks
      ? userReducer.bookMarks.includes(item._id)
      : false;

    return (
      <>
        <TouchableOpacity
          onPress={() => onStoryPress(item._id, hasUserBookMarkedStory, hasUserLikedStory)}
          style={styles.storyCard}>
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
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
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
