import React, {useState, useEffect} from 'react';
import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Buffer} from 'buffer';
import TrackPlayer, { useTrackPlayerProgress} from 'react-native-track-player'; 

import AudioRecord from 'react-native-audio-record';

// API
import {audioStream, initialiseStream, sequenceStream, finaliseStream} from './../api/postRequests/audioStream';
import {getSubQuestionFromQuestionID} from './../api/getRequests/getSubQuestions';

// Actions
import { saveAllQuestions, incrementQuestionIndex, resetQuestionReducerToOriginalState, resetSubQuestionIndex, saveSubQuestions, incrementSubQuestionIndex, decrementSubQuestionIndex, decrementQuestionIndex } from './../redux/actions/questionActions';
import {setPlayerState, resetRecorderState} from './../redux/actions/recorderActions';

// Helpers
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

  // User Reducer
  userReducer,

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
    await TrackPlayer.add([track]);
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
    setPlayerState("PAUSED");
    const audioPathURL = await sequenceStream();

    const track = {
      id: "MAXTEST",
      url: `https://a-life-lived-s3-bucket.s3-ap-southeast-2.amazonaws.com/wav/13dd6e702c2daa8e28069c68ba05c286463a84d4cb686ac6a8248722958ef63a29242d963808cbf809af34d995baeb8d39417e988d62018c5f8e94513fad8663f2af5ec4406cf6d90389602ce89b7a831e3803a8b09e791437efd92723c3091204cc006ef33e701382fdaa96f7c77189be047fd782c1a4e993fa61106df1aa29f57d03ee9da97c993fbcc26142d5b342d8d09260618e9e4cb83725c77dcc0aa9d59588ba4c65f949ad73e6df6e404f24a314b3357177114a0d62d212ecc692755cd3c4b6026259f1a65dc239c8bdce664bad7ba05246ac55bab1d35fc76c6e4af976e4df95efa75ef8b26fd1fa20a56f7e5d74bcf78f7cf40cb10f83db429fd5023d763294412f627ff1ee52/38b0a8b6-a63f-43d7-8366-2b357e45b3fa.wav`,
      title: "MAXXX",
      artist: "MAXXXXXX",
    };

    await TrackPlayer.add([track])
    return setRecordedURL(audioPathURL);
  };

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

  // When the user goes to the next question the below states are reset.
  const onNextButton = async (userSelectedOption) => {
    // When there are no more questions left
    if (questionIndex === questions.length - 1) {
      console.log('END');
      return;
    };
    
    if (subQuestionIndex === subQuestions.length - 1) {
      // Reset states to original 
      setSubQuestionActive(false);
      setIsInitialiseLoaded(false);
      setSkipOption(true);
      setPlayerState('IDLE');
      resetSubQuestionIndex();
      await finaliseStream();
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

      setIsInitialiseLoaded(false);
      setSubQuestionActive(true);
      incrementSubQuestionIndex();
      return await finaliseStream();
    }
  };

  // The below handles if there is a subQuestion linked to the master question
  const handleIfSubQuestion = async () => {
    if (subQuestionActive) {
      return;
    } else if (questions[questionIndex].subQuestions){
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
    if (isInitialiseLoaded === false) {
      onLoad();
    };

    handleIfSubQuestion();

    // Need to figure out a better timer

    // if (playerState === 'RECORDING') {
    //   setTimeout(() => {
    //     setTimerSeconds(timerSeconds + 1);
    //   }, 1000);
    // }
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
          handleOnYesOrNoButtonPress={(userSelectedOption) => onNextButton(userSelectedOption)}
          setQuestionIndex={() => decrementQuestionIndex()}
          onBackButton={() => onBackButton()}
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
    recorderReducer: state.recorderReducer,
    userReducer: state.userReducer
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