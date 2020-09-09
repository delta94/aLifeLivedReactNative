import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {audioFileIdToUrl} from './../api/postRequests/audioStream';


// Animation
import * as Animatable from 'react-native-animatable';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import { COLOR, ICON_SIZE } from './../styles/styleHelpers';
import styles from './../styles/components/StoryQuestionSectionComponent';

const StoryQuestionSectionComponent = ({questionTitle, questionAudioFileId, questionID, playerState, playAudio, pauseAudio, subQuestionActive, subQuestion}) => {

  const track = {
    id: subQuestionActive ? subQuestion.id : questionID,
    url: audioFileIdToUrl(subQuestionActive ? subQuestion.audioFile : questionAudioFileId),
    title: subQuestionActive ? subQuestion.title : questionTitle,
    artist: subQuestionActive ? subQuestion.title : questionTitle,
  };

  const handleTextDisplay = () => {
    if (!subQuestion) {
      return questionTitle
    } else {
      return subQuestion.title
    }
  };

  const handlePlayPauseButton = () => {
    switch (playerState) {
      case "IDLE":
        return (
          <TouchableOpacity onPress={() => playAudio(track)} style={styles.touchableOpacityContainer}>
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
          <TouchableOpacity onPress={() => playAudio(track)} style={styles.touchableOpacityContainer}>
            <MaterialCommunityIcons
              name="play-circle"
              size={ICON_SIZE.iconSizeLarge}
              color={COLOR.white}
            />
            <Text style={{color: COLOR.grey}}> Play question and recorded audio </Text>
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
        <Text style={styles.questionTitle}>{handleTextDisplay()}</Text>
      </Animatable.Text>
      { questionAudioFileId ? handlePlayPauseButton() : null}
      
    </View>
  );
};

export default StoryQuestionSectionComponent;