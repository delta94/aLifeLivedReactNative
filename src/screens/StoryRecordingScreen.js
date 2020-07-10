import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

// API
import {getAllQuestions} from './../api/getRequests/getQuestions';

// Components
import StoryTimerComponent from './../components/StoryTimerComponent';
import StoryRecordSectionComponent from './../components/StoryRecordSectionComponent';
import StoryQuestionSectionComponent from './../components/StoryQuestionSectionComponent';
import ButtonComponent from './../components/ButtonComponent';

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';

// Styles
import styles from './../styles/screens/StoryRecordingScreen';
import { COLOR, ICON_SIZE } from './../styles/styleHelpers';

const StoryRecordingScreen = ({navigation}) => {

  const [recordingStatus, setRecordingStatus] = useState("IDLE");
  const [timerSeconds, setTimerSeconds] = useState(0);

  const onLoad = async () => {
    const response = await getAllQuestions();
    response.data.map((question) => {
      console.log(question);
    })
  };

  // When recording mic icon
  const onRecordStart = () => {
    setRecordingStatus("RECORDING")
  };

  // When user hits the pause icon
  const onRecordPause = () => {
    setRecordingStatus("PAUSED")
  };
  
  // This controls the timer
  useEffect(() => {
    onLoad();
    if (recordingStatus === "RECORDING") {
      setTimeout(() => {
        setTimerSeconds(timerSeconds + 1);
      }, 1000);
    }
  }, [timerSeconds, recordingStatus]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.crossIconContainer}>
          <AntDesign
            name="close"
            size={ICON_SIZE.iconSizeMedium}
            color={COLOR.grey}
            style={styles.icon}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
        <View style={styles.timerContainer}>
          <StoryTimerComponent recordingStatus={recordingStatus} timerSeconds={timerSeconds} />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <StoryQuestionSectionComponent questionTitle={"PLACEHOLDER TITLE"} />
      </View>

      <View style={styles.footer}>
        <StoryRecordSectionComponent recordingStatus={recordingStatus} onRecordPause={() => onRecordPause()} onRecordStart={() => onRecordStart()}  />
        <View style={styles.footerButtonContainer}>
          <ButtonComponent
            title="Skip"
            buttonSize="small"
          />
        </View>
      </View>
    </View>
  );
}; 

export default StoryRecordingScreen;