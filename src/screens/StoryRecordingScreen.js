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
  // Recording States
  const [recordingStatus, setRecordingStatus] = useState("IDLE");
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Questions state
  const [questions, setQuestions] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0)

  // Question audio state
  const [questionAudioPlaying, setQuestionAudioPlaying] = useState(false);

  // Loads questions.
  const onLoad = async () => {
    const response = await getAllQuestions();
    setQuestions(response.data);
  };

  // This increments the questions.
  const handleQuestion = () => {
    setQuestionIndex(questionIndex + 1);
  };

  // When recording mic icon.
  const onRecordStart = () => {
    setRecordingStatus("RECORDING");
  };
 
  // When user hits the pause icon.
  const onRecordPause = () => {
    setRecordingStatus("PAUSED");
  };
  
  // This controls the timer and loads the questions.
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
            onPress={() => navigation.reset({routes: [{ name: 'Home' }]})}
          />
        </View>
        <View style={styles.timerContainer}>
          <StoryTimerComponent recordingStatus={recordingStatus} timerSeconds={timerSeconds} />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <StoryQuestionSectionComponent 
          questionTitle={questions ? questions[questionIndex].title : null}
          questionAudioURL={questions ? questions[questionIndex].audioFileURL : null}
          isAudioPlaying={questionAudioPlaying}
          questionAudioPlaying={(isAudioPlaying) => setQuestionAudioPlaying(isAudioPlaying)}
        />
      </View>

      <View style={styles.footer}>
        <StoryRecordSectionComponent recordingStatus={recordingStatus} onRecordPause={() => onRecordPause()} onRecordStart={() => onRecordStart()}  />
        <View style={styles.footerButtonContainer}>
          <ButtonComponent
            title="Skip"
            buttonSize="small"
            onButtonPress={() => handleQuestion()}
          />
        </View>
      </View>
    </View>
  );
}; 

export default StoryRecordingScreen;