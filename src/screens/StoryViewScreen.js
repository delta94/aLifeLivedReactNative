import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  useTrackPlayerProgress, 
  STATE_PLAYING,
} from 'react-native-track-player';

// API
import {getStoryByID} from './../api/getRequests/getStory';
import { likeStory, unLikeStory } from './../api/putRequests/story';
import { bookMarkStory, unBookMarkStory } from './../api/putRequests/user';

// Actions
import { removeLikedStory, addLikedStory, addBookMarkedStory, removeBookMarkedStory } from './../redux/actions/userActions';

// Component
import AvatarComponent from './../components/AvatarComponent';
import SliderComponent from './../components/SliderComponent';

// Styles
import styles from './../styles/screens/StoryViewScreen';
import { ICON_SIZE, COLOR } from './../styles/styleHelpers';

// Icon
import { Icon } from 'react-native-elements'

const events = [
  TrackPlayerEvents.PLAYBACK_STATE
];

const StoryViewScreen = ({ route, navigation, userReducer, removeLikedStory, addLikedStory, addBookMarkedStory, removeBookMarkedStory, allCollectionsReducer}) => {
  const {position, bufferedPosition, duration} = useTrackPlayerProgress();
  const [story, setStory] = useState(null);
  const [tags, setTags] = useState([]);
  const [storyLikes, setStoryLikes] = useState(0);
  const [didLike, setDidLike] = useState(false);
  const [didBookmark, setDidBookmark] = useState(false);
  const [audioState, setAudioState] = useState("NONE");


  // Gets the player state and sets local state. 
  useTrackPlayerEvents(events, (event) => {
    console.log(event);
    setAudioState(event.state)
  });

  const onLoad = async () => {
    // If for some reason reducer is undefined resort to api call
    if (!allCollectionsReducer.stories) {
      const response = await getStoryByID(route.params.storyID);
      if (response.status === 200) {
        setStory(response.data);
        setStoryLikes(response.data.likes)
        setTags(response.data.tags)
      } else {
        console.log('error')
      }
    };

    // ELSE grab item from the reducer
    const storyData = allCollectionsReducer.stories.find(({ _id }) => _id === route.params.storyID);

    // Sets local state
    setStory(storyData);
    setStoryLikes(storyData.likes);
    setTags(storyData.tags);

    // Audio player track
    const track = {
      id: storyData._id,
      url: "https://a-life-lived-s3-bucket.s3-ap-southeast-2.amazonaws.com/questionAudioFiles/A+life+lived+dummy+questions.WAV",
      title: storyData.title,
      artist: storyData.interviewer.username
    };


    // Removes any other tracks 
    await TrackPlayer.reset();

    // Loads track 
    await TrackPlayer.add(track);
    
    // If user is not logged
    if (route.params.userID) {
      // Below checks if the user has already liked or bookmarked the story, if so it disables button
      const hasUserLikedStory = userReducer.likedStories.includes(route.params.storyID);
      const hasUserBookmarkedStory = userReducer.bookMarks.includes(route.params.storyID);

      // Updates local states
      setDidLike(hasUserLikedStory);
      return setDidBookmark(hasUserBookmarkedStory);
    };
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
        <View style={styles.tagContainer} key={tag._id}>
          <Text style={styles.tagText}>{story === null ? '' : tag.title}</Text>
        </View>
      )
    });

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
      // call first to allow update of UI quickly
      setStoryLikes(storyLikes - 1);
      setDidLike(false);
      
      const response = await unLikeStory(route.params.storyID, route.params.userID);

      if (response.status === 200) {
        // Removes from reducer
        return removeLikedStory(route.params.storyID);
      } else { 
        //  If error then return to original state
        setStoryLikes(storyLikes + 1);
        setDidLike(true);
        return console.log("ERROR")
      }
    // If user has not liked or recently un liked
    } else {
      setStoryLikes(storyLikes + 1);
      setDidLike(true);
      const response = await likeStory(route.params.storyID, route.params.userID);

      if (response.status === 200) {
        // Add to reducer
        return addLikedStory(route.params.storyID);
      } else {
        // If error return to original state
        setStoryLikes(storyLikes - 1);
        setDidLike(false);
        return console.log("Error");
      }
    }
  };


  // Handle when user clicks on bookmark button
  const onBookmarkPress = async () => {
    // If user is not logged in
    if (!route.params.userID) {
      return navigation.navigate("Login");
    };

    // If already bookmarked 
    if (didBookmark) {
      // Update UI
      setDidBookmark(false);
      const response = await unBookMarkStory(route.params.storyID, route.params.userID);     
      response.status === 200 ? removeBookMarkedStory(route.params.storyID) : setDidBookmark(true);
    } else {
      setDidBookmark(true);
      const response = await bookMarkStory(route.params.storyID, route.params.userID);
      response.status === 200 ? addBookMarkedStory(route.params.storyID) : setDidBookmark(false);
    };
  };


  // Handle when user clicks play
  const onPlay = async () => {
    await TrackPlayer.play();
  };

  // Handle when user clicks pause
  const onPause = async () => {
    return await TrackPlayer.pause();
  };

  // Handle when user clicks fast forward 
  const onFastForward = async () => {
    // Gets the current track position then seeks to position + 5 seconds
    const position = await TrackPlayer.getPosition();
    return TrackPlayer.seekTo(position + 5);
  };

  // Handle when user clicks rewind
  const onRewind = async () => {
    // Gets the current track position then seeks to position - 5 seconds
    const position = await TrackPlayer.getPosition();
    return TrackPlayer.seekTo(position - 5);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => handleOnClose()}>
          <Icon
            name="times"
            type='font-awesome-5'
            size={ICON_SIZE.iconSizeMedium}
            style={{alignSelf: 'flex-start'}}
            color={COLOR.grey}
          />
        </TouchableOpacity>

        <View style={styles.header}>
          <AvatarComponent
            isRounded={true}
            size="large"
            iconName="user"
            source={story === null ? '' : story.interviewer.avatarURL}
          />

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitleText}>{story === null ? '' : story.title}</Text>
            <View style={styles.headerSubContentContainer}>
              <Icon name="user" type="font-awesome-5" solid={true} size={ICON_SIZE.iconSizeSmall} color={COLOR.grey} />
              <Text style={styles.headerSubText}>{story === null ? '' : story.interviewer.username}</Text>
                
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
        <View style={styles.sliderContainer}>
          <SliderComponent maxValue={duration} currentPosition={position} />
        </View>
        <View style={styles.audioControllerContainer}>
          <TouchableOpacity onPress={() => onRewind()}>
            <Icon
              name="backward"
              type='font-awesome-5'
              size={ICON_SIZE.iconSizeXLarge}
              color={COLOR.grey}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => audioState === "playing" ? onPause() : onPlay()}>
            <Icon
              name={audioState === "playing" ? "pause" : "play"}
              type='font-awesome-5'
              size={ICON_SIZE.iconSizeXLarge}
              color={COLOR.grey}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onFastForward()}>
            <Icon
              name="forward"
              type='font-awesome-5'
              size={ICON_SIZE.iconSizeXLarge}
              color={COLOR.grey}
            />
          </TouchableOpacity>
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
    userReducer: state.userReducer,
    allCollectionsReducer: state.allCollectionsReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeLikedStory: (storyID) => dispatch(removeLikedStory(storyID)),
    addLikedStory: (storyID) => dispatch(addLikedStory(storyID)),
    addBookMarkedStory: (storyID) => dispatch(addBookMarkedStory(storyID)),
    removeBookMarkedStory: (storyID) => dispatch(removeBookMarkedStory(storyID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryViewScreen);