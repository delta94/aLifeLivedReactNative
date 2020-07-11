import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Player, MediaStates} from '@react-native-community/audio-toolkit';

// Animation
import * as Animatable from 'react-native-animatable';

const StoryQuestionSectionComponent = ({questionTitle, questionAudioURL, isAudioPlaying, questionAudioPlaying}) => {
  const audioPlayer = new Player(questionAudioURL);
  const playAudio = async () => {
    await audioPlayer.play();
    return questionAudioPlaying(true);
  };

  const pauseAudio = async () => {
    await audioPlayer.pause();
    return questionAudioPlaying(false);
  };

  return (
    <View>
      <Animatable.Text animation="fadeIn" easing="ease-in">
        <Text> {questionTitle} </Text>
      </Animatable.Text>
      {isAudioPlaying ? (
        <TouchableOpacity onPress={() => pauseAudio()}>
          <Text> Pause </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => playAudio()}>
          <Text> Play question </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => pauseAudio()}>
        <Text> Pause </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StoryQuestionSectionComponent;