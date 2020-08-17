import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';

// API
import {getAllPublicStories} from './../api/getRequests/getStory';

// Components
import StoryCardComponent from './../components/StoryCardComponent';

// Styles
import styles from './../styles/screens/HomeScreen';

const HomeScreen = ({route, navigation, userReducer}) => {

  const [stories, setStories] = useState([]);

  const onLoad = async () => {
    const allStories = await getAllPublicStories();
    return setStories(allStories.data)
  };

  useEffect(() => {
    onLoad();
  }, []);

  const onStoryPress = (storyID) => {
    const userID = userReducer.id
    // Navigates to the StoryStack then to view Story
    navigation.navigate("Create Story", {
      screen: 'View Story',
      params: { storyID, userID },
    });
  }

  const renderStories = ({ item }) => {
    const hasUserLikedStory = userReducer.likedStories.includes(item.id);
    console.log(hasUserLikedStory);
    return (
      <TouchableOpacity onPress={() => onStoryPress(item.id)}>
        <Text style={styles.headerText}>Popular</Text>
        <StoryCardComponent
          title={item.title}
          description={item.description}
          tags={item.tags}
          avatarURL={item.interviewer.avatarURL}
          likes={item.likes}
          hasUserLikedStory={hasUserLikedStory}
        />
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FlatList
          data={stories}
          renderItem={renderStories}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer
  };
};

export default connect(mapStateToProps)(HomeScreen);
