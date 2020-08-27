import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

// API 
import { getUserStories } from './../api/getRequests/getUser';

// Redux Actions
import { setUserStories } from './../redux/actions/userActions';

// Components
import ButtonClearComponent from './../components/ButtonClearComponent';
import StoryCardComponent from './../components/StoryCardComponent';

// Styles
import styles from './../styles/screens/ProfileScreen';
import { COLOR } from '../styles/styleHelpers';

const ProfileScreen = ({ userReducer, allCollectionsReducer, navigation, setUserStories}) => {
  const MY_STORIES = "MY_STORIES";
  const BOOKMARKED_STORIES = 'BOOKMARKED_STORIES';
  const LIKED_STORIES = "LIKED_STORIES";

  const [profileDisplay, setProfileDisplay] = useState(MY_STORIES);
  const [buttonFocused, setButtonFocused] = useState(MY_STORIES);
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const dataDisplay = () => {
    switch (profileDisplay) {
      case LIKED_STORIES:

        // If no data then return empty array.
        if (!userReducer.likedStories) {
          return setData([]);
        };

        // Sets the data display to show all the users liked stories. 
        const likedStories = userReducer.likedStories.map((likedStory) => {
          const filteredStory = allCollectionsReducer.stories.filter(story => story._id === likedStory);
          return filteredStory[0];
        });

        setData(likedStories);
        return setRefreshing(false);
      case BOOKMARKED_STORIES: 

        // If no data then return empty array.
        if (!userReducer.bookMarks) {
          return setData([]);
        };
        
        // Sets the data display to show all the users bookmarked stories. 
        const bookmarkedStories = userReducer.bookMarks.map((bookmarkedStory) => {
          const bookmarkedStories = allCollectionsReducer.stories.filter(story => story._id === bookmarkedStory);
          return bookmarkedStories[0];
        });

        setData(bookmarkedStories);
        return setRefreshing(false);
      case MY_STORIES: 
        if (!userReducer.userStories) {
          return setData([]);
        };

        setData(userReducer.userStories);
        break;
      default:
        // ensures it is displaying the correct data nad if none then display none. 
        setData([]);
        return setRefreshing(false);
    }
  };

  useEffect(() => {
    dataDisplay();
  }, [profileDisplay]);

  const handleRefresh = async () => {
    setRefreshing(true);
    switch (profileDisplay) {
      case MY_STORIES:
        const userStories = await getUserStories(userReducer.id);
        setUserStories(userStories.data);
        setRefreshing(false);
        break;
      default:
        setRefreshing(false);
        break;
    }
  };

  const onStoryPress = (storyID) => {
    const userID = userReducer.id
    // Navigates to the StoryStack then to view Story
    return navigation.push('View Story', { screen: 'View Story', params: { storyID, userID } });
  };

  const onNoData = () => {
    return (
      <View>
        <Text style={styles.headerText}>This looks blank...try liking, bookmarking or creating amazing stories!</Text>
      </View>
    )
  }

  const renderStories = ({ item }) => {
    const hasUserLikedStory = userReducer.likedStories ? userReducer.likedStories.includes(item._id) : false;
    const hasUserBookMarkedStory = userReducer.bookMarks ? userReducer.bookMarks.includes(item._id) : false;

    return (
      <>
        <TouchableOpacity onPress={() => onStoryPress(item._id)} style={styles.storyCard}>
          <StoryCardComponent
            title={item.title}
            description={item.description}
            tags={item.tags}
            avatarURL={item.interviewer ? item.interviewer.avatarURL : null}
            likes={item.likes}
            hasUserLikedStory={hasUserLikedStory}
            hasUserBookMarkedStory={hasUserBookMarkedStory}
          />
        </TouchableOpacity>
      </>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonListDisplay}>
        <ScrollView horizontal={true}>
          <View style={buttonFocused == MY_STORIES ? styles.buttonFocused : styles.buttonItem}>
            <ButtonClearComponent
              buttonType="clear"
              title="My Stories"
              onButtonPress={() => {setProfileDisplay(MY_STORIES), setButtonFocused(MY_STORIES)}}
              titleStyle={buttonFocused == MY_STORIES ? styles.buttonFocusedText : {color: COLOR.grey}}
            />
          </View>

          <View style={buttonFocused == BOOKMARKED_STORIES ? styles.buttonFocused : styles.buttonItem}>
            <ButtonClearComponent
              buttonType="clear"
              title="Book marked stories"
              onButtonPress={() => {setProfileDisplay(BOOKMARKED_STORIES), setButtonFocused(BOOKMARKED_STORIES)}}
              style={styles.buttonItem}
              titleStyle={buttonFocused == BOOKMARKED_STORIES ? styles.buttonFocusedText : {color: COLOR.grey}}
            />
          </View>

          <View style={buttonFocused == LIKED_STORIES ? styles.buttonFocused : styles.buttonItem}>
            <ButtonClearComponent
              buttonType="clear"
              title="Liked Stories"
              onButtonPress={() => {setProfileDisplay(LIKED_STORIES), setButtonFocused(LIKED_STORIES) }}
              titleStyle={buttonFocused == LIKED_STORIES ? styles.buttonFocusedText : {color: COLOR.grey}}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={data}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserStories: (userStories) => dispatch(setUserStories(userStories))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
