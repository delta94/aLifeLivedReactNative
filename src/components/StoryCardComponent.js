import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';


const StoryCardComponent = ({title, description, tags}) => {
  console.log('MAX', tags);
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
};

export default StoryCardComponent;