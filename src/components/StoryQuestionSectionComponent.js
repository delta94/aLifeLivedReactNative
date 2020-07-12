import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TrackPlayer from 'react-native-track-player';

// Animation
import * as Animatable from 'react-native-animatable';

const StoryQuestionSectionComponent = ({questionTitle, questionAudioURL, isAudioPlaying, playAudio}) => {

  const startAudio = async () => {
    // Add a track to the queue
    await TrackPlayer.add({
      id: 'trackId',
      url: questionAudioURL,
      title: 'Track Title',
      artist: 'Track Artist',
    });

    return playAudio();
  };

  const handlePlayPauseButton = () => {
    switch (isAudioPlaying) {
      case "IDLE":
        return (
          <TouchableOpacity onPress={() => startAudio()}>
            <Text> Play question </Text>
          </TouchableOpacity>
        );
      default:
        break;
    }
  };

  return (
    <View>
      <Animatable.Text animation="fadeIn" easing="ease-in">
        <Text> {questionTitle} </Text>
      </Animatable.Text>
      {handlePlayPauseButton()}
    </View>
  );
};

export default StoryQuestionSectionComponent;