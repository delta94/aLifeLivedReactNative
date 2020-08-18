import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';

// Actions
import { saveAllStories } from './../redux/actions/allCollections';

// API
import {getAllPublicStories} from './../api/getRequests/getStory';
import { bookMarkStory, unBookMarkStory } from './../api/putRequests/user';

// Components
import StoryCardComponent from './../components/StoryCardComponent';

// Styles
import styles from './../styles/screens/HomeScreen';

const HomeScreen = ({ route, navigation, userReducer, allCollectionsReducer, saveAllStories}) => {

  const onLoad = async () => {
    const allStories = await getAllPublicStories();
    return saveAllStories(allStories.data);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const onStoryPress = (storyID) => {
    const userID = userReducer.id
    // Navigates to the StoryStack then to view Story
    navigation.navigate("View Story", {storyID, userID });
  };

  // Handle when user clicks on bookmark button
  const onBookmarkPress = async () => {
    // If user is not logged in
    if (!userReducer.id) {
      return navigation.navigate("Login");
    };
  };

  const renderStories = ({ item }) => {
    const hasUserLikedStory = userReducer.likedStories ? userReducer.likedStories.includes(item.id) : false;
    const hasUserBookMarkedStory = userReducer.bookMarks ? userReducer.bookMarks.includes(item.id) : false;

    return (
      <>
        <Text style={styles.headerText}>Popular</Text>
        <TouchableOpacity onPress={() => onStoryPress(item.id)}>
          <StoryCardComponent
            title={item.title}
            description={item.description}
            tags={item.tags}
            avatarURL={item.interviewer.avatarURL}
            likes={item.likes}
            hasUserLikedStory={hasUserLikedStory}
            hasUserBookMarkedStory={hasUserBookMarkedStory}
            onBookMarkPress={() => onBookmarkPress()}
          />
        </TouchableOpacity>
      </>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FlatList
          data={allCollectionsReducer.stories}
          renderItem={renderStories}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
    allCollectionsReducer: state.allCollectionsReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveAllStories: (stories) => dispatch(saveAllStories(stories))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
