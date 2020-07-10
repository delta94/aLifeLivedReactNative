import React from 'react';
import {View, Text} from 'react-native';

// Animation
import * as Animatable from 'react-native-animatable';

const StoryQuestionSectionComponent = ({questionTitle}) => {
  return (
    <View>
      <Animatable.Text animation="fadeIn" easing="ease-in"><Text> {questionTitle} </Text></Animatable.Text>
    </View>
  )
};

export default StoryQuestionSectionComponent;