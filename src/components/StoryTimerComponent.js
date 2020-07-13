import React from 'react';
import {View, Text} from 'react-native';

// Animation
import * as Animatable from 'react-native-animatable';

// Styles
import styles from './../styles/components/StoryTimerComponent';

const StoryTimerComponent = ({timerSeconds, recordingStatus}) => {

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
    <View style={styles.mainContainer}>
      <Text>{getMinutes()}:{getSeconds()}</Text>
      <View style={styles.statusContainer}>
        {recordingStatus === "RECORDING" ? <Animatable.View animation="fadeIn" iterationCount={"infinite"}><View style={styles.recordingSymbol}></View></Animatable.View> : null}
        <Text>{recordingStatus}</Text>
      </View>
    </View>
  );
};

export default StoryTimerComponent;