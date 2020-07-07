import React, {useEffect} from 'react';
import {View, Text} from 'react-native';


const StoryTimerComponent = ({timerSeconds}) => {

  // Below sets the seconds
  const getSeconds = () => {
    const seconds = ('0' + (timerSeconds % 60)).slice(-2);
    return seconds;
  };

  // Below sets the minutes
  const getMinutes = () => {
    const minutes = Math.floor(timerSeconds / 60);
    return minutes;
  };
  
  return (
    <View>
      <Text>{getMinutes()}:{getSeconds()}</Text>
    </View>
  );
};

export default StoryTimerComponent;