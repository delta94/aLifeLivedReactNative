import React from 'react';
import {View, Text} from 'react-native';

const StoryQuestionSectionComponent = ({questionTitle}) => {
  return (
    <View>
      <Text> {questionTitle} </Text>
    </View>
  )
};

export default StoryQuestionSectionComponent;