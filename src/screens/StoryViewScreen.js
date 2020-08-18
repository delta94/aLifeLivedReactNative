import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

// API
import {getStoryByID} from './../api/getRequests/getStory';
import { likeStory, unLikeStory } from './../api/putRequests/story';
import { bookMarkStory, unBookMarkStory } from './../api/putRequests/user';

// Component
import AvatarComponent from './../components/AvatarComponent';

// Styles
import styles from './../styles/screens/StoryViewScreen';
import { ICON_SIZE, COLOR } from './../styles/styleHelpers';

// Icon
import { Icon } from 'react-native-elements'

const StoryViewScreen = ({route, navigation, userReducer}) => {
  const [story, setStory] = useState(null);
  const [responses, setResponses] = useState([]);
  const [tags, setTags] = useState([]);
  const [storyLikes, setStoryLikes] = useState(0);
  const [didLike, setDidLike] = useState(false);
  const [didBookmark, setDidBookmark] = useState(false);

  const onLoad = async () => {
    const storyData = await getStoryByID(route.params.storyID);

    if (storyData.status === 200) {
      setStory(storyData.data);
      setStoryLikes(storyData.data.likes)
      setTags(storyData.data.tags)
    } else {
      console.log(storyData)
    }

    // If user is not logged
    if (route.params.userID) {
      // Below checks if the user has already liked or bookmarked the story, if so it disables button
      const hasUserLikedStory = userReducer.likedStories.includes(route.params.storyID);
      const hasUserBookmarkedStory = userReducer.bookMarks.includes(route.params.storyID);

      // Updates local states
      setDidLike(hasUserLikedStory);
      return setDidBookmark(hasUserBookmarkedStory);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  // When the user presses the cross button
  const handleOnClose = () => {
    return navigation.reset({ routes: [{ name: 'Home' }] });
  };

  // Displays the tags of story
  const displayTags = () => {
    const tag = tags.map((tag) => {
      return (
        <View style={styles.tagContainer} key={tag.id}>
          <Text style={styles.tagText}>{story === null ? '' : tag.title}</Text>
        </View>
      )
    })

    return tag
  };

  // Handle when user presses on heart button
  const onHeartPress = async () => {
    // If user is not logged in
    if (!route.params.userID) {
      return navigation.navigate("Login");
    };

    // Handles if the user has liked before if so user can dislike
    if (didLike) {
      const response = await unLikeStory(route.params.storyID, route.params.userID);

      if (response.status === 200) {
        setStoryLikes(storyLikes - 1);
        return setDidLike(false);
      } else { 
        console.log("ERROR")
      }
    // If user has not liked or recently un liked
    } else {
      const response = await likeStory(route.params.storyID, route.params.userID);

      if (response.status === 200) {
        setStoryLikes(storyLikes + 1);
        return setDidLike(true);
      } else {
        console.log("Error")
      }
    }
  };

  // Handle when user clicks on bookmark button
  // TODO: Handle unBookMark
  const onBookmarkPress = async () => {
    // If user is not logged in
    if (!route.params.userID) {
      return navigation.navigate("Login");
    };

    if (didBookmark) {
      const response = await unBookMarkStory(route.params.storyID, route.params.userID);

      if (response.status === 200) {
        return setDidBookmark(false);
      } else {
        console.log('error');
      };
    } else {
      const response = await bookMarkStory(route.params.storyID, route.params.userID);

      if (response.status === 200) {
        return setDidBookmark(true);
      } else {
        console.log("error");
      };
    };
  };

  // Handle when user clicks play


  // Handle when user clicks pause


  // Handle when user clicks fast forward 


  // Handle when user clicks rewind

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Icon
          name="times"
          type='font-awesome-5'
          size={ICON_SIZE.iconSizeMedium}
          style={{alignSelf: 'flex-start'}}
          color={COLOR.grey}
          onPress={() => handleOnClose()}
        />

        <View style={styles.header}>
          <AvatarComponent
            isRounded={true}
            size="large"
            iconName="user"
            source={story === null ? '' : story.interviewer.avatar}
          />

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitleText}>{story === null ? '' : story.title}</Text>
            <View style={styles.headerSubContentContainer}>
              <Icon name="user" type="font-awesome-5" solid={true} size={ICON_SIZE.iconSizeSmall} color={COLOR.grey} />
              <Text style={styles.headerSubText}>{story === null ? '' : story.interviewer.userName}</Text>
                
              <Icon name="heart" type="font-awesome-5" solid={true} size={ICON_SIZE.iconSizeSmall} color={COLOR.red} />
              <Text style={styles.headerSubText}>{story === null ? '' : storyLikes}</Text>
            </View>

            {displayTags()}
          </View>
        </View>
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.headerDescriptionText}>
          {story === null ? '' : story.description}
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.audioControllerContainer}>
          <Icon
            name="backward"
            type='font-awesome-5'
            size={ICON_SIZE.iconSizeXLarge}
            color={COLOR.grey}
          />

          <Icon
            name="play"
            type='font-awesome-5'
            size={ICON_SIZE.iconSizeXLarge}
            color={COLOR.grey}
          />

          <Icon
            name="forward"
            type='font-awesome-5'
            size={ICON_SIZE.iconSizeXLarge}
            color={COLOR.grey}
          />
        </View>

        <View style={styles.bookMarkContainer}>
          <Icon
            name="heart"
            solid={didLike}
            type='font-awesome-5'
            size={ICON_SIZE.iconSizeLarge}
            disabledStyle={{backgroundColor: null}}
            color={COLOR.red}
            onPress={() => onHeartPress()}
          />

          <Icon
            name="bookmark"
            type='font-awesome-5'
            size={ICON_SIZE.iconSizeLarge}
            disabledStyle={{ backgroundColor: null }}
            solid={didBookmark}
            color={COLOR.grey}
            onPress={() => onBookmarkPress()}
          />
        </View>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer
  };
};

export default connect(mapStateToProps)(StoryViewScreen);