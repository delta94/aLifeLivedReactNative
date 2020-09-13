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

  const handleTextDisplay = () => {
    if (!subQuestion) {
      return questionTitle
    } else {
      return subQuestion.title
    }
  };

  const handlePlayPauseButton = () => {
    // TODO: Fix warning
    const track = {
      id: subQuestionActive ? subQuestion.id : questionID,
      url: audioFileIdToUrl(subQuestionActive ? subQuestion.audioFile : questionAudioFileId.audioFile),
      title: subQuestionActive ? subQuestion.title : questionTitle,
      artist: subQuestionActive ? subQuestion.title : questionTitle,
    };
    
    switch (playerState) {
      case "ready":
        case "idle":
          case "loading":
            case "buffering":
        return (
          <TouchableOpacity onPress={() => playAudio(track)} style={styles.touchableOpacityContainer}>
            <MaterialCommunityIcons
              name="play-circle"
              size={ICON_SIZE.iconSizeLarge}
              color={COLOR.white}
            />
            <Text>Play question and recorded audio</Text>
          </TouchableOpacity>
        );
      case "paused":
        return (
          <TouchableOpacity onPress={() => playAudio(track)} style={styles.touchableOpacityContainer}>
            <MaterialCommunityIcons
              name="play-circle"
              size={ICON_SIZE.iconSizeLarge}
              color={COLOR.white}
            />
            <Text style={{color: COLOR.grey}}>Play question and recorded audio</Text>
          </TouchableOpacity>
        );
      case "playing":
        return (
          <TouchableOpacity onPress={() => pauseAudio()} style={styles.touchableOpacityContainer}>
            <MaterialCommunityIcons
              name="stop-circle"
              size={ICON_SIZE.iconSizeLarge}
              color={COLOR.white}
            />
            <Text>Stop question</Text>
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