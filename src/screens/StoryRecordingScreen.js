import React, {useState, useEffect} from 'react';
import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Buffer} from 'buffer';
import TrackPlayer from 'react-native-track-player'; 

import AudioRecord from '@alifelived/react-native-audio-record';

// API
import {audioStream, initialiseStream, sequenceStream} from './../api/postRequests/audioStream';
import {getSubQuestionFromQuestionID} from './../api/getRequests/getSubQuestions';

// Actions
import { saveAllQuestions, incrementQuestionIndex, resetQuestionReducerToOriginalState, resetSubQuestionIndex, saveSubQuestions, incrementSubQuestionIndex, decrementSubQuestionIndex, decrementQuestionIndex } from './../redux/actions/questionActions';
import {setPlayerState, resetRecorderState, setRecordedAudioFilepath} from './../redux/actions/recorderActions';
import {saveResponse} from './../redux/actions/storyActions';

// Helpers
import {handleYesDecision, handleNoDecision} from './../helpers/userSelectionHandlers';
import { finaliseStreamAndCreateResponse } from './../helpers/finaliseAndCreateResponse';

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
  setRecordedAudioFilepath,
  resetRecorderState,

  // User Reducer
  userReducer,

  // Story Reducer
  saveResponse,

  // Other
  navigation,
}) => {

  // This sets the recording options
  const options = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    wavFile: 'audio.wav', // default 'audio.wav'
  };

  const [skipOption, setSkipOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialiseLoaded, setIsInitialiseLoaded] = useState(false);

  // Recording States
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [recordedURL, setRecordedURL] = useState('');
  const playerState = recorderReducer.playerState;

  // timer use effect
  useEffect(() => {
    if (playerState === 'RECORDING') {
      const interval = setInterval(() => {
        setTimerSeconds(timerSeconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    }, [timerSeconds, playerState]);

  const recordedFilePath = recorderReducer.filePath;
  
  // Questions state
  const [questions] = useState(questionReducer.questions);
  const questionIndex = questionReducer.questionIndex;

  // Sub Question state
  const [subQuestionActive, setSubQuestionActive] = useState(false);
  const [subQuestions, setSubQuestions] = useState([]);
  const subQuestionIndex = questionReducer.subQuestionIndex;

  // Loads questions.
  const onLoad = async () => {
    setIsInitialiseLoaded(false);
    Platform.OS === 'android' ? await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]): null;

    initialiseStream(userReducer.id);
    await AudioRecord.init(options);
    setIsInitialiseLoaded(true);
  };

  // Pause Audio
  const pauseAudio = async () => {
    await TrackPlayer.stop();
    return setPlayerState('IDLE');
  };
  
  // Play audio
  const playAudio = async (track) => {
    const playTheseTracks = [track];
    if (recordedFilePath) {
      // IF there is a recording it will play the recording after the question. As if it was the real thing
      playTheseTracks.push(filePathToTrack(recordedFilePath));
    }
    await TrackPlayer.add(playTheseTracks);

     await TrackPlayer.play();
     return setPlayerState('PLAYING');
  };
  // Start recording
  const onRecordStart = async () => {
    AudioRecord.start();
    
    // This is needed or it sends warns
    const audioData = AudioRecord.on('data', (data) => {
      const bufferChunk = Buffer.from(data, 'base64');
      audioStream(bufferChunk);
    });

    setSkipOption(false);
    return setPlayerState('RECORDING');
  };

  // When user hits the pause.
  const onRecordPause = async () => {
    await AudioRecord.stop();
    const filePath = await sequenceStream();
    setRecordedAudioFilepath(filePath);
    return setPlayerState("PAUSED");
  };

  const filePathToTrack = (filePath) => {
    return {
      id: 'recording',
      url: filePath,
      title: 'TEST',
      artist: 'TEST',
    };
  }

  // Handles the back button out of subQuestions
  const onBackButton = async () => {
    // if index is less than or equal to 0 then turn subQuestion active off and reset index
    if (subQuestionIndex <= 0) {
      setSubQuestionActive(false);
      return resetSubQuestionIndex();
    } else if (subQuestionIndex > 0) {
      return decrementSubQuestionIndex();
    } else {
      return decrementQuestionIndex();
    }
  };

  const handleOnYes = async () => {
    // Gets the subQuestions 
    const allQuestions = await handleIfSubQuestion()

    // Filters the array and sees if there are any yes decision types
    const filteredYesSubQuestions = await handleYesDecision(allQuestions);

    if (filteredYesSubQuestions.length === 0) {
      setIsInitialiseLoaded(false);
      setSubQuestionActive(false);
      return incrementQuestionIndex();
    };

    setSubQuestionActive(true);
    setSubQuestions(filteredYesSubQuestions);

    // Below handles the onload, default set to null to handle the first question.
    setSubQuestionActive(true);
    setIsInitialiseLoaded(false);
    return incrementSubQuestionIndex();
  };

  const handleOnNo = async () => {
    // Gets the subQuestions 
    const allQuestions = await handleIfSubQuestion();

    // Filters the array and sees if there are any no decision types
    const filteredNoSubQuestions = handleNoDecision(allQuestions);

    if (filteredNoSubQuestions.length <= 0) {
      setIsInitialiseLoaded(false);
      return incrementQuestionIndex();
    };

    setSubQuestionActive(true);
    setSubQuestions(filteredNoSubQuestions);
    setSubQuestionActive(true);
    setIsInitialiseLoaded(false);
    return incrementSubQuestionIndex();
  };

  // handles the on next button
  const onNextButton = async () => {
    const questionId = subQuestionActive ? subQuestions[subQuestionIndex].subQuestionID : questions[questionIndex].id;

    // Finalise stream and creates response with questionID and audio File
    const responseID = await finaliseStreamAndCreateResponse(questionId);

    // Save response to redux 
    saveResponse(responseID)

    // if subQ is the last one
    if (subQuestionIndex === subQuestions.length - 1) {
      // Reset states to original 
      setSubQuestionActive(false);
      setSkipOption(true);
      setPlayerState('IDLE');
      resetSubQuestionIndex();
      incrementQuestionIndex();

      // If sub question is not the last one
    } else if (subQuestionActive && subQuestionIndex !== subQuestions.length - 1) {
      setPlayerState('IDLE');
      setSkipOption(true);
      incrementSubQuestionIndex();
    };

    return setIsInitialiseLoaded(false);
  };

  // The below handles the on skip
  const handleOnSkip = async () => {
    // If subQuestion active and isn't last sub Q
    if (subQuestionActive && subQuestionIndex !== subQuestions.length - 1) {
      incrementSubQuestionIndex();
      // If on master question
    } else if (!subQuestionActive) {
      incrementQuestionIndex();
      // Everything else
    } else if (subQuestionIndex === subQuestions.length - 1) {
      // Reset states to original 
      setSubQuestionActive(false);
      setSkipOption(true);
      setPlayerState('IDLE');
      resetSubQuestionIndex();
      incrementQuestionIndex();
    };

    return setIsInitialiseLoaded(false);
  };

  // When the user is at the last question
  // TODO: FIRE RESPONSE HERE
  const handleEndOfQuestions = async () => {
    // Finalise stream and creates response with questionID and audio File
    const questionId = subQuestionActive ? subQuestions[subQuestionIndex].subQuestionID : questions[questionIndex].id;
    const responseID = await finaliseStreamAndCreateResponse(questionId)

    // Save response to redux 
    saveResponse(responseID)

    // Resets states
    resetRecorderState();
    resetQuestionReducerToOriginalState();

    // Navigates to final create story page
    return navigation.navigate('Create Story', {step: 3});
  };

  // The below handles if there is a subQuestion linked to the master question
  const handleIfSubQuestion = async () => {
    if (await questions[questionIndex].subQuestions.length <= 0) {
      setSubQuestions([]);
      return [];
    };
    
    if (subQuestionActive) {
      return;
    } else if (questions[questionIndex].subQuestions){
      const responseData = await getSubQuestionFromQuestionID(questions[questionIndex].id);
      setSubQuestions(responseData);
      return responseData;
    } 
  };

  // When user presses the close button
  const onClose = () => {
    navigation.reset({routes: [{name: 'Home'}]});
    resetRecorderState();
    return resetQuestionReducerToOriginalState();
  };

  // This controls loads the questions.
  useEffect(() => {
    if (isInitialiseLoaded === false) {
      onLoad();
    };

  }, [playerState, questionIndex, subQuestionIndex]);


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
          handleOnYes={() => handleOnYes()}
          handleOnNo={() => handleOnNo()}
          setQuestionIndex={() => decrementQuestionIndex()}
          onBackButton={() => onBackButton()}
          onNextButton={() => onNextButton()}
          handleEndOfQuestions={() => handleEndOfQuestions()}
          skipOption={skipOption}
          handleOnSkip={() => handleOnSkip()}
        />
      </View>
    </View>
  );
}; 

function mapStateToProps(state) {
  return {
    questionReducer: state.questionReducer,
    recorderReducer: state.recorderReducer,
    userReducer: state.userReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Recorder reducer actions
    setPlayerState: (playerState) => dispatch(setPlayerState(playerState)),
    setRecordedAudioFilepath: (filePath) =>dispatch(setRecordedAudioFilepath(filePath)),
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

    // Story Reducer actions
    saveResponse: (responseID) => dispatch(saveResponse(responseID)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryRecordingScreen);