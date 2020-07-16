import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TrackPlayer, { seekTo } from 'react-native-track-player';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

// Animation
import * as Animatable from 'react-native-animatable';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import { COLOR, ICON_SIZE } from './../styles/styleHelpers';
import styles from './../styles/components/StoryQuestionSectionComponent';

const StoryQuestionSectionComponent = ({questionTitle, questionAudioURL, isAudioPlaying, playAudio, pauseAudio, questionID, capturedAudio}) => {

    const startAudio = async () => {
      // Add a track to the queue
      await TrackPlayer.add({
        id: '1',
        url: capturedAudio,
        title: questionTitle,
        artist: questionTitle,
      });

      return playAudio();
    };


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
          <TouchableOpacity onPress={() => playAudio(questionAudioURL)} style={styles.touchableOpacityContainer}>
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
    </View>
  );
};

export default StoryQuestionSectionComponent;