import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  useTrackPlayerProgress,
  STATE_BUFFERING,
} from 'react-native-track-player';

// API
import {getStoryByID} from './../api/getRequests/getStory';
import { likeStory, unLikeStory } from './../api/putRequests/story';
import { bookMarkStory, unBookMarkStory } from './../api/putRequests/user';
import {audioFileIdToUrl} from './../api/postRequests/audioStream';

// Actions
import { removeLikedStory, addLikedStory, addBookMarkedStory, removeBookMarkedStory } from './../redux/actions/userActions';

// Component
import AvatarComponent from './../components/AvatarComponent';
import SliderComponent from './../components/SliderComponent';

// Styles
import styles from './../styles/screens/StoryViewScreen';
import { ICON_SIZE, COLOR } from './../styles/styleHelpers';

// Icon
import IconComponent from './../components/IconComponent';

// NOTE:  Audio state for android is shown in number 1, 2, 3 - 1 idle/stopped,  
const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
];

const StoryViewScreen = ({ route, navigation, removeLikedStory, addLikedStory, addBookMarkedStory, removeBookMarkedStory, allCollectionsReducer}) => {

  const {position, bufferedPosition, duration} = useTrackPlayerProgress();
  const [story, setStory] = useState(null);
  const [tags, setTags] = useState([]);
  const [storyLikes, setStoryLikes] = useState(0);
  const [didLike, setDidLike] = useState(route.params.hasUserBookMarkedStory);
  const [didBookmark, setDidBookmark] = useState(route.params.hasUserBookMarkedStory);
  const [audioState, setAudioState] = useState("NONE");
  const [isAudioLoading, setIsAudioLoading] = useState(true);

  // Gets the player state and sets local state. 
  useTrackPlayerEvents(events, (event) => {
    if (event.state === STATE_BUFFERING) {
      setIsAudioLoading(true);
      console.log('MAX');
    } else if (event.state != STATE_BUFFERING) {
      setIsAudioLoading(false);
    };

    return setAudioState(event.state);
  });


  const onLoad = async () => {
    // IF story is in reducer grab item from the reducer
    const storyData = allCollectionsReducer.stories.find(({ _id }) => _id === route.params.storyID);

    // If for some reason reducer is undefined resort to api call
    if (!allCollectionsReducer.stories || !storyData) {
      storyData = await getStoryByID(route.params.storyID);
      if (storyData.status === 200) {
        setStory(storyData.data);
        setStoryLikes(storyData.data.likes)
        setTags(storyData.data.tags)
      } else {
        console.log('error')
      }
    }

    // Sets local state
    setStory(storyData);
    setStoryLikes(storyData.likes);
    setTags(storyData.tags);

    // Audio player track
    const track = {
      id: storyData._id,
      url: audioFileIdToUrl(storyData.responseAudioFile),
      title: storyData.title,
      artist: storyData.interviewer.username
    };

    // Removes any other tracks 
    await TrackPlayer.reset();

    // Loads track 
    return await TrackPlayer.add(track);
  };

  useEffect(() => {
    onLoad();
  }, []);

  // When the user presses the cross button
  const handleOnClose = () => {
    // This handles if the user is viewing this screen after the creation of their story. Redirects them to home instead of back into story creation.
    route.params.lastScreen === 'Create Story' ? navigation.navigate('Home') : navigation.goBack();
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

    return tag;
  };

  // Handle when user presses on heart button
  const onHeartPress = async () => {
    // If user is not logged in
    if (!route.params.userID) {
      return navigation.navigate('authNavigator', {
        screen: 'authStack',
        params: {
          screen: 'Login'
        }
      });
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
      return navigation.navigate('authNavigator', {
        screen: 'authStack',
        params: {
          screen: 'Login'
        }
      });
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
    console.log(await TrackPlayer.getQueue());
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
        <IconComponent
          name="times"
          onPress={() => handleOnClose()}
          type='font-awesome-5'
          size={ICON_SIZE.iconSizeMedium}
          style={{alignSelf: 'flex-start'}}
          color={COLOR.grey}
        />

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
              <IconComponent name="user" type="font-awesome-5" solid={true} size={ICON_SIZE.iconSizeSmall} color={COLOR.grey} />
              <Text style={styles.headerSubText}>{story === null ? '' : story.interviewer.username}</Text>
                
              <IconComponent name="heart" type="font-awesome-5" solid={true} size={ICON_SIZE.iconSizeSmall} color={COLOR.red} />
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
          <IconComponent
            name="backward"
            onPress={() => onRewind()}
            type='font-awesome-5'
            size={ICON_SIZE.iconSizeXLarge}
            color={isAudioLoading ? COLOR.lightGrey : COLOR.grey}
            disabled={isAudioLoading}
            disabledStyle={{ backgroundColor: null }}
          />

          <IconComponent
            onPress={() => audioState === "playing" || audioState === 3 ? onPause() : onPlay()}
            name={audioState === "playing" || audioState === 3 ? "pause" : "play"}
            type='font-awesome-5'
            size={ICON_SIZE.iconSizeXLarge}
            color={isAudioLoading ? COLOR.lightGrey : COLOR.grey}
            disabled={isAudioLoading}
            disabledStyle={{ backgroundColor: null }}
          />

          <IconComponent
            name="forward"
            type='font-awesome-5'
            onPress={() => onFastForward()}
            size={ICON_SIZE.iconSizeXLarge}
            color={isAudioLoading ? COLOR.lightGrey : COLOR.grey}
            disabled={isAudioLoading}
            disabledStyle={{ backgroundColor: null }}
          />
        </View>

        <View style={styles.bookMarkContainer}>
          <IconComponent
            name="heart"
            onPress={() => onHeartPress()}
            solid={didLike}
            type='font-awesome-5'
            size={ICON_SIZE.iconSizeLarge}
            disabledStyle={{backgroundColor: null}}
            color={COLOR.red}
            
          />

          <IconComponent
            name="bookmark"
            type='font-awesome-5'
            onPress={() => onBookmarkPress()}
            size={ICON_SIZE.iconSizeLarge}
            disabledStyle={{ backgroundColor: null }}
            solid={didBookmark}
            color={COLOR.grey}
          />
        </View>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
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