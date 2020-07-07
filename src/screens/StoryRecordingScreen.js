import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

// Components
import StoryTimerComponent from './../components/StoryTimerComponent';

const StoryRecordingScreen = () => {

  const [recordingStatus, setRecordingStatus] = useState("IDLE");
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  useEffect(() => {
    let interval = null;
    interval = setTimeout(() => {
      setTimerSeconds(timerSeconds + 1);
    }, 1000);
  }, [timerSeconds]);

  return (
    <View>
      <Text> HERE I AM</Text>
      <StoryTimerComponent recordingStatus={recordingStatus} timerSeconds={timerSeconds} />
    </View>
  );
}; 

export default StoryRecordingScreen;