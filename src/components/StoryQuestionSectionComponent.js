import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TrackPlayer, { seekTo } from 'react-native-track-player';
import Sound from 'react-native-sound';

// Animation
import * as Animatable from 'react-native-animatable';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import { COLOR, ICON_SIZE } from './../styles/styleHelpers';
import styles from './../styles/components/StoryQuestionSectionComponent';

const StoryQuestionSectionComponent = ({questionTitle, questionAudioURL, isAudioPlaying, playAudio, pauseAudio, questionID, capturedAudio}) => {
  // Enable playback in silence mode
  Sound.setCategory('Playback');
  const replayAudioTEST = () => {
  const audioPlayBack = new Sound(capturedAudio, "", (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
        audioPlayBack.getDuration() +
        'number of channels: ' +
        audioPlayBack.getNumberOfChannels(),
    );

    // Play the sound with an onEnd callback
    return audioPlayBack.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
  }
  const audioPlayBack = new Sound(capturedAudio, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
        audioPlayBack.getDuration() +
        'number of channels: ' +
        audioPlayBack.getNumberOfChannels(),
    );

    // Play the sound with an onEnd callback
    audioPlayBack.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });

  const startAudio = async () => {
    await TrackPlayer.add({
      id: questionID,
      url: questionAudioURL,
      title: questionTitle,
      artist: questionTitle,
    });

    return playAudio();
  };

  const replayAudio = async () => {
    await TrackPlayer.add({
      id: capturedAudio,
      url: 'file://' + capturedAudio,
      title: questionTitle,
      artist: questionTitle,
    });
    return playAudio();
  }

  const handlePlayPauseButton = () => {
    switch (isAudioPlaying) {
      case "IDLE":
        return (
          <TouchableOpacity onPress={() => startAudio()} style={styles.touchableOpacityContainer}>
            <MaterialCommunityIcons
              name="play-circle"
              size={ICON_SIZE.iconSizeLarge}
              color={COLOR.white}
            />
            <Text> Listen to question </Text>
          </TouchableOpacity>
        );
      case "PAUSED":
        return (
          <TouchableOpacity onPress={() => startAudio()} style={styles.touchableOpacityContainer}>
            <MaterialCommunityIcons
              name="play-circle"
              size={ICON_SIZE.iconSizeLarge}
              color={COLOR.white}
            />
            <Text> Play question </Text>
          </TouchableOpacity>
        );
      case "PLAYING":
        return (
          <TouchableOpacity onPress={() => pauseAudio()} style={styles.touchableOpacityContainer}>
            <MaterialCommunityIcons
              name="stop-circle"
              size={ICON_SIZE.iconSizeLarge}
              color={COLOR.white}
            />
            <Text> Stop question </Text>
          </TouchableOpacity>
        );
      default:
        break;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Animatable.Text animation="fadeIn" easing="ease-in" style={styles.questionTitleContainer}>
        <Text style={styles.questionTitle}> {questionTitle}</Text>
      </Animatable.Text>
      {handlePlayPauseButton()}
      <TouchableOpacity onPress={() => replayAudioTEST()} style={styles.touchableOpacityContainer}>
        <MaterialCommunityIcons
          name="stop-circle"
          size={ICON_SIZE.iconSizeLarge}
          color={COLOR.white}
        />
        <Text> Stop question </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoryQuestionSectionComponent;