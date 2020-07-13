import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import TrackPlayer, { pause } from 'react-native-track-player';
import {connect} from 'react-redux';

// API
import {getAllQuestions} from './../api/getRequests/getQuestions';

// Actions
import { saveAllQuestions } from './../redux/actions/questionActions';

// Services
import trackPlayerServices from '../services/services';

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

const StoryRecordingScreen = ({navigation, questionReducer, saveAllQuestions}) => {

  // TODO:
  // 1. When the user hits the back button they should go back to the previous state with the recording and the timer the same. 
  // 2. User needs to be able to record, recording should then go to the AWS server when they hit the next button. 


  // Screen states
  const [isLoading, setIsLoading] = useState(false);

  // Recording States
  const [recordingStatus, setRecordingStatus] = useState("IDLE");
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Questions state
  const [questions, setQuestions] = useState(questionReducer.questions);
  const [trackSetUp, setTrackSetUp] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  
  // Loads questions.
  const onLoad = async () => {
    if (questions === null) {
      setIsLoading(true)
      const response = await getAllQuestions();
      saveAllQuestions(response.data);
      setQuestions(questionReducer.questions);
      return setIsLoading(false)
    };

    return setQuestions(questionReducer.questions);
  };

  // Loads track player
  const trackPlayerOnLoad = async () => {
    await TrackPlayer.setupPlayer().then(() => {
      console.log('Player is set up');
    });

    TrackPlayer.registerPlaybackService(() => trackPlayerServices);
    return setTrackSetUp(true);
  };

  // Pause Audio
  const pauseAudio = async () => {
    await TrackPlayer.stop();
    return setRecordingStatus("IDLE");
  };

  // Play audio
  const playAudio = async () => {
    await TrackPlayer.play();
    return setRecordingStatus("PLAYING");
  }

  // When recording mic icon.
  const onRecordStart = () => {
    setRecordingStatus("RECORDING");
  };
 
  // When user hits the pause icon.
  const onRecordPause = () => {
    setRecordingStatus("PAUSED");
  };

  // When the user goes to the next question the below states are reset.
  const onNextButton = () => {
    if (questionIndex === questions.length - 1) {
      console.log("END")
      return;
    };
    setTimerSeconds(0);
    setRecordingStatus("IDLE");
    return setQuestionIndex(questionIndex + 1)
  };

  // This controls the timer and loads the questions.
  useEffect(() => {
    onLoad();

    if (!trackSetUp) {
      trackPlayerOnLoad();
    };

    if (recordingStatus === 'RECORDING') {
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
          questionID={questions ? questions[questionIndex].id : null}
          isAudioPlaying={recordingStatus}
          playAudio={() => playAudio()}
          pauseAudio={() => pauseAudio()}
          questionAudioPlaying={(isAudioPlaying) => setRecordingStatus(isAudioPlaying)}
          isLoading={isLoading}
        />
      </View>

      <View style={styles.footer}>
        <StoryRecordSectionComponent recordingStatus={recordingStatus} pauseAudio={() => pauseAudio()} onRecordPause={() => onRecordPause()} onRecordStart={() => onRecordStart()}  />
        <View style={styles.footerButtonContainer}>
          {questionIndex <= 0 ? (
              <View></View>
            ) : (
              <ButtonComponent
                title={"Back"}
                buttonSize="small"
                onButtonPress={() => setQuestionIndex(questionIndex - 1)}
                disabled={recordingStatus === "PLAYING" || recordingStatus === "RECORDING" ? true : false}
              />
            )
          }
          <ButtonComponent
            title={questionIndex === questions.length - 1 ? "Finish" : "Next"}
            buttonSize="small"
            onButtonPress={() => onNextButton()}
            disabled={recordingStatus === "PLAYING" || recordingStatus === "RECORDING" ? true : false}
          />
        </View>
      </View>
    </View>
  );
}; 

function mapStateToProps(state) {
  return {
    questionReducer: state.questionReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveAllQuestions: (questions) => dispatch(saveAllQuestions(questions))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryRecordingScreen);