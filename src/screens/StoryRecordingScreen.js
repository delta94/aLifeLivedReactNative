import React, {useState, useEffect} from 'react';
import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import {Buffer} from 'buffer';
import {connect} from 'react-redux';
import TrackPlayer, {useTrackPlayerEvents, useTrackPlayerProgress, TrackPlayerEvents} from 'react-native-track-player';
import RNFS from 'react-native-fs'; 

import AudioRecord from 'react-native-audio-record';

// API
import {imageUpload} from './../api/postRequests/imageUpload'; // This will eventually be changed to a file upload or a file stream.
import {createResponse} from './../api/postRequests/response';
import {getSubQuestionFromQuestionID} from './../api/getRequests/getSubQuestions';

// Actions
import { saveAllQuestions, incrementQuestionIndex, resetQuestionReducerToOriginalState, resetSubQuestionIndex, saveSubQuestions, incrementSubQuestionIndex, decrementSubQuestionIndex, decrementQuestionIndex } from './../redux/actions/questionActions';
import {setPlayerState, resetRecorderState} from './../redux/actions/recorderActions';

// Helpers
import {searchFile} from './../helpers/searchFile';
import {handleYesDecision, handleNoDecision} from './../helpers/userSelectionHandlers';

// Components
import StoryTimerComponent from './../components/StoryTimerComponent';
import StoryRecordSectionComponent from './../components/StoryRecordSectionComponent';
import StoryQuestionSectionComponent from './../components/StoryQuestionSectionComponent';
import StoryButtonsComponent from '../components/StoryButtonsComponent';

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';

// Styles
import styles from './../styles/screens/StoryRecordingScreen';
import { COLOR, ICON_SIZE } from './../styles/styleHelpers';

const StoryRecordingScreen = ({
  // Question Reducer
  questionReducer,
  saveSubQuestions,
  incrementQuestionIndex,
  decrementQuestionIndex,
  incrementSubQuestionIndex,
  decrementSubQuestionIndex,
  resetSubQuestionIndex,
  resetQuestionReducerToOriginalState,
  
  // Recorder Reducer
  recorderReducer,
  setPlayerState,
  resetRecorderState,

  // Other
  navigation,
}) => {
  const events = [
    TrackPlayerEvents.PLAYBACK_STATE,
    TrackPlayerEvents.PLAYBACK_ERROR,
    TrackPlayerEvents.PLAYBACK_QUEUE_ENDED,
  ];

  // Gets the state of the player and also get resets state when player ends
  useTrackPlayerEvents(events, async (event) => {
    event.type === 'playback-queue-ended' ? setPlayerState('IDLE') : null;
  });

  // This sets the recording options
  const options = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    wavFile: 'audio.wav', // default 'audio.wav'
  };

  // Button states
  const [skipOption, setSkipOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const playerState = recorderReducer.playerState;

  // Recording States
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [recordedURL, setRecordedURL] = useState('');

  // Questions state
  const [questions] = useState(questionReducer.questions);
  const questionIndex = questionReducer.questionIndex;

  // Sub Question state
  const [subQuestionActive, setSubQuestionActive] = useState(false);
  const [subQuestions, setSubQuestions] = useState([]);
  const subQuestionIndex = questionReducer.subQuestionIndex;

  // Loads questions.
  const onLoad = async () => {
    Platform.OS === 'android'
      ? await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ])
      : null;

    await AudioRecord.init(options);
  };

  // Pause Audio
  const pauseAudio = async () => {
    await TrackPlayer.stop();
    return setPlayerState('IDLE');
  };

  // Play audio
  const playAudio = async (track) => {
    await TrackPlayer.add([track]);

    if (recordedURL) {
      const recordedTrack = {
        id: 'recording',
        url: recordedURL,
        title: 'TEST',
        artist: 'TEST',
      };

      // IF there is a recording it will play the recording after the question. As if it was the real thing
      await TrackPlayer.add([recordedTrack]);
    }

    await TrackPlayer.play();
    return setPlayerState('PLAYING');
  };

  // Start recording
  const onRecordStart = async () => {
    AudioRecord.start();
    const audioData = AudioRecord.on('data', (data) => {});

    setSkipOption(false);
    return setPlayerState('RECORDING');
  };

  // When user hits the pause.
  const onRecordPause = async () => {
    const audioFile = await AudioRecord.stop();

    // TODO: Remove the below section when streaming file is complete and working.
    const file = await RNFS.readDir(RNFS.DocumentDirectoryPath).then(
      async (result) => {
        // Search file looks through the file in the directory and finds the correct file to play.
        return searchFile(result, audioFile);
      },
    );

    try {
      let audioSuffix = file.path.split('.').pop();
      const filePath = file.path;
      const fileName = file.name;

      const fileUpload = {
        type: `audio/${audioSuffix}`,
        name: fileName,
        uri: filePath,
      };

      let formData = new FormData();
      formData.append('file', fileUpload);
      const response = await imageUpload(formData);
      setRecordedURL(response.data);
    } catch (error) {
      console.log(error);
    }

    return setPlayerState('PAUSED');
  };

  // When the user goes to the next question the below states are reset.
  const onNextButton = async (userSelectedOption) => {
    setIsLoading(true);

    // When there are no more questions left
    if (questionIndex === questions.length - 1) {
      console.log('END');
      return;
    };
    
    if (subQuestionIndex === subQuestions.length - 1) {
      // Reset states to original 
      setSubQuestionActive(false);
      setTimerSeconds(0);
      setSkipOption(true);
      setPlayerState('IDLE');
      setIsLoading(false);
      resetSubQuestionIndex();
      return incrementQuestionIndex();
    } else if (subQuestions && subQuestionIndex <= subQuestions.length - 1) {
      // Handle if the user selects yes or no then filters the subQuestions accordingly.
      switch (userSelectedOption) {
        case true:
          // Filters the array and sees if there are any yes decision types
          const filteredYesSubQuestions = handleYesDecision(subQuestions);

          if (filteredYesSubQuestions.length <= 0) {
            return incrementQuestionIndex();
          };

          setSubQuestionActive(true);
          setSubQuestions(filteredYesSubQuestions);
          break;
        case false:
          const filteredNoSubQuestions = handleNoDecision(subQuestions);

          if (filteredNoSubQuestions.length <= 0) {
            return incrementQuestionIndex();
          };

          setSubQuestionActive(true);
          setSubQuestions(filteredNoSubQuestions);
          break;
        default:
          break;
      };

      // Below handles the onload, default set to null to handle the first question.
      setSubQuestionActive(true);
      setIsLoading(false);
      return incrementSubQuestionIndex();
    }
  };

  // The below handles if there is a subQuestion linked to the master question
  const handleIfSubQuestion = async () => {
    if (questions[questionIndex].subQuestions) {
      const responseData = await getSubQuestionFromQuestionID(questions[questionIndex].id);
      return setSubQuestions(responseData);
    }
  };

  // When user presses the close button
  const onClose = () => {
    navigation.reset({routes: [{name: 'Home'}]});
    resetRecorderState();
    return resetQuestionReducerToOriginalState();
  };

  // This controls the timer and loads the questions.
  useEffect(() => {
    onLoad();
    handleIfSubQuestion();

    // Need to figure out a better timer
    // if (playerState === 'RECORDING') {
    //   setTimeout(() => {
    //     setTimerSeconds(timerSeconds + 1);
    //   }, 1000);
    // }
  }, [timerSeconds, playerState, questionIndex]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.crossIconContainer}>
          <AntDesign
            name="close"
            size={ICON_SIZE.iconSizeMedium}
            color={COLOR.grey}
            style={styles.icon}
            onPress={() => onClose()}
          />
        </View>
        <View style={styles.timerContainer}>
          <StoryTimerComponent
            recordingStatus={playerState}
            timerSeconds={timerSeconds}
          />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <StoryQuestionSectionComponent
          questionTitle={questions[questionIndex].title}
          questionAudioURL={questions[questionIndex].isYesOrNo && subQuestionActive === false ? null : questions[questionIndex].audioFileURL}
          subQuestion={subQuestionActive ? subQuestions[subQuestionIndex] : null}
          subQuestionActive={subQuestionActive}
          questionID={questions[questionIndex].id}
          playerState={playerState}
          playAudio={(track) => playAudio(track)}
          pauseAudio={() => pauseAudio()}
          questionAudioPlaying={(isAudioPlaying) => setPlayerState(isAudioPlaying)}
        />
      </View>

      <View style={styles.footer}>
        {questions[questionIndex].isYesOrNo && subQuestionActive === false ? (
          <Text style={styles.headerText}>
            Please select one of the below options...
          </Text>
        ) : (
          <StoryRecordSectionComponent
            playerState={playerState}
            recordedURL={recordedURL}
            pauseAudio={() => pauseAudio()}
            onRecordPause={() => onRecordPause()}
            onRecordStart={() => onRecordStart()}
          />
        )}
        <StoryButtonsComponent
          questionIndex={questionIndex}
          playerState={playerState}
          isLoading={isLoading}
          questions={questions}
          isYesOrNo={questions[questionIndex].isYesOrNo}
          subQuestionActive={subQuestionActive}
          handleOnYesOrNoButtonPress={(userSelectedOption) => onNextButton(userSelectedOption)}
          setQuestionIndex={() => incrementQuestionIndex()}
          onNextButton={() => onNextButton()}
          skipOption={skipOption}
        />
      </View>
    </View>
  );
}; 

function mapStateToProps(state) {
  return {
    questionReducer: state.questionReducer,
    recorderReducer: state.recorderReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Recorder reducer actions
    setPlayerState: (playerState) => dispatch(setPlayerState(playerState)),
    resetRecorderState: () => dispatch(resetRecorderState()),

    // Question reducer actions
    saveAllQuestions: (questions) => dispatch(saveAllQuestions(questions)),
    saveSubQuestions:  (subQuestions) => dispatch(saveSubQuestions(subQuestions)), 
    incrementQuestionIndex: () => dispatch(incrementQuestionIndex()),
    decrementQuestionIndex: () => dispatch(decrementQuestionIndex()),
    incrementSubQuestionIndex: () => dispatch(incrementSubQuestionIndex()),
    decrementSubQuestionIndex: () => dispatch(decrementSubQuestionIndex()),
    resetSubQuestionIndex: () => dispatch(resetSubQuestionIndex()),
    resetQuestionReducerToOriginalState: () => dispatch(resetQuestionReducerToOriginalState()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryRecordingScreen);