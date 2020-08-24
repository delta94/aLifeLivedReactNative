import React, {useState, useEffect} from 'react';
import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Buffer} from 'buffer';
import TrackPlayer from 'react-native-track-player'; 

import AudioRecord from '@alifelived/react-native-audio-record';

// API
import {audioStream, initialiseStream, sequenceStream, channelIdToUrl} from './../api/postRequests/audioStream';

// Actions
import { incrementQuestionIndex, resetQuestionReducerToOriginalState, resetSubQuestionIndex, saveSubQuestions, incrementSubQuestionIndex, decrementSubQuestionIndex, decrementQuestionIndex } from './../redux/actions/questionActions';
import {setPlayerState, resetRecorderState } from './../redux/actions/recorderActions';
import {saveResponse} from './../redux/actions/storyActions';

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

  const currentQuestion = () => {
    if (subQuestionActive) {
      return subQuestions[subQuestionIndex];
    }
    else
      return questions[questionIndex];
  }
  // Recording States
  const [timerSeconds, setTimerSeconds] = useState(currentQuestion().audioDuration ? currentQuestion().audioDuration : 0);
  const [recordedURL, setRecordedURL] = useState('');
  const playerState = recorderReducer.playerState;

  const setQuestionResponse = (response) => {
    currentQuestion().response = response;
  }

  const setQuestionChannel = (chanId) => {
    currentQuestion().channelId = chanId;
  }

  const setQuestionAudioDuration = () => {
    currentQuestion().audioDuration = timerSeconds;
  }

  const currentMatchedSubQuestions = () => {
    try {
      const responseMatch = questions[questionIndex].response;
      return questions[questionIndex].subQuestions.filter(
        (subQuestion) => {
          return subQuestion.decisionType === responseMatch;
        },
      );
    }
    catch (err) {
      return [];
    }
  }


  // Loads questions.
  const onLoad = async () => {
    setIsInitialiseLoaded(false);
    Platform.OS === 'android' ? await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]): null;

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
    await TrackPlayer.reset();
    const playTheseTracks = [track];
    if (currentQuestion().response === 'AUDIO') {
      // IF there is a recording it will play the recording after the question. As if it was the real thing
      playTheseTracks.push(channelIdToTrack(currentQuestion().channelId));
    }
    await TrackPlayer.add(playTheseTracks);

     await TrackPlayer.play();
     return setPlayerState('PLAYING');
  };
  // Start recording
  const onRecordStart = async () => {
    if (!currentQuestion().channelId)
      setQuestionChannel(await initialiseStream());

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
    setQuestionResponse('AUDIO');
    setQuestionAudioDuration();
    const onFinalQuestion = (questionIndex === questions.length - 1);
    await sequenceStream();
    return;
  };

  const channelIdToTrack = (channelId) => {
    return {
      id: 'recording',
      url: channelIdToUrl(channelId),
      title: 'TEST',
      artist: 'TEST',
    };
  }

  // Handles the back button out of subQuestions
  const onBackButton = async () => {
    // if index is less than or equal to 0 then turn subQuestion active off and reset index
    if (subQuestionIndex <= 0) {
      setSubQuestionActive(false);
      resetSubQuestionIndex();
      return decrementQuestionIndex();
    } else if (subQuestionIndex > 0) {
      return decrementSubQuestionIndex();
    } else {
      return decrementQuestionIndex();
    }
  };

  const handleOnYesNo = async (response) => {
    setQuestionResponse(response);
    
    if (currentMatchedSubQuestions().length === 0) {
      setIsInitialiseLoaded(false);
      if (response === 'YES')
        setSubQuestionActive(false);
      return incrementQuestionIndex();
    };

    setSubQuestionActive(true);
    setSubQuestions(currentMatchedSubQuestions());

    // Below handles the onload, default set to null to handle the first question.
    setSubQuestionActive(true);
    setIsInitialiseLoaded(false);
    return incrementSubQuestionIndex();
  };

  // handles the on next button
  const onNextButton = async () => {
    const questionId = subQuestionActive ? subQuestions[subQuestionIndex].subQuestionID : questions[questionIndex].id;

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
    setQuestionResponse('SKIP');
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
  const handleEndOfQuestions = async () => {
    // Resets states
    resetRecorderState();
    resetQuestionReducerToOriginalState();

    // Navigates to final create story page
    return navigation.navigate('Create Story', {step: 3});
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
          questionAudioFileId={questions[questionIndex].isYesOrNo && subQuestionActive === false ? null : questions[questionIndex].audioFile}
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
          handleOnYes={() => handleOnYesNo('YES')}
          handleOnNo={() => handleOnYesNo('NO')}
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
    resetRecorderState: () => dispatch(resetRecorderState()),

    // Question reducer actions
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