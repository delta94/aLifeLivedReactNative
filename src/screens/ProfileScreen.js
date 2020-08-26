import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

// Components
import ButtonClearComponent from './../components/ButtonClearComponent';
import StoryCardComponent from './../components/StoryCardComponent';

// Styles
import styles from './../styles/screens/ProfileScreen';

const ProfileScreen = ({userReducer, allCollectionsReducer, navigation}) => {
  const [profileDisplay, setProfileDisplay] = useState("MY_STORIES");
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const dataDisplay = () => {
    switch (profileDisplay) {
      case "LIKED_STORIES":
        // Sets the data display to show all the users liked stories. 
        const likedStories = userReducer.likedStories.map((likedStory) => {
          const filteredStory = allCollectionsReducer.stories.filter(story => story._id === likedStory);
          return filteredStory[0];
        });

        setData(likedStories);
        return setRefreshing(false);
      case "BOOKMARKED_STORIES": 
        // Sets the data display to show all the users bookmarked stories. 
        const bookmarkedStories = userReducer.bookMarks.map((bookmarkedStory) => {
          const bookmarkedStories = allCollectionsReducer.stories.filter(story => story._id === bookmarkedStory);
          return bookmarkedStories[0];
        });

        setData(bookmarkedStories);
        return setRefreshing(false);
      default:
        // ensures it is displaying the correct data nad if none then display none. 
        setData([]);
        return setRefreshing(false);
    }
  };

  useEffect(() => {
    dataDisplay();
  }, [profileDisplay]);

  const handleRefresh = () => {
    setRefreshing(true);
    return dataDisplay();
  };

  const onStoryPress = (storyID) => {
    const userID = userReducer.id
    // Navigates to the StoryStack then to view Story
    return navigation.push('View Story', { screen: 'View Story', params: { storyID, userID } });
  };

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
          <View style={styles.buttonItem}>
            <ButtonClearComponent
              title="My Stories"
              onButtonPress={() => setProfileDisplay("MY_STORIES")}
              style={styles.buttonItem}
            />
          </View>

          <View style={styles.buttonItem}>
            <ButtonClearComponent
              title="Book marked stories"
              onButtonPress={() => setProfileDisplay("BOOKMARKED_STORIES")}
              style={styles.buttonItem}
            />
          </View>

          <View style={styles.buttonItem}>
            <ButtonClearComponent
              title="Liked Stories"
              onButtonPress={() => setProfileDisplay("LIKED_STORIES")}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList 
          data={data}
          renderItem={renderStories}
          keyExtractor={item => item._id}
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
  };
};


export default connect(mapStateToProps)(ProfileScreen);
