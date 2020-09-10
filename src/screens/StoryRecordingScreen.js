import React, {useState, useEffect} from 'react';
import {View, Text, PermissionsAndroid, Platform, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Buffer} from 'buffer';
import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  useTrackPlayerProgress,
} from 'react-native-track-player';

import AudioRecord from '@alifelived/react-native-audio-record';

// API
import {audioStream, initialiseAudioStream, getUnusedChannel, sequenceStream, channelIdToUrl, terminateChannels, audioFileIdToUrl} from './../api/postRequests/audioStream';

// Actions
import { incrementQuestionIndex, resetQuestionReducerToOriginalState, resetSubQuestionIndex, incrementSubQuestionIndex, decrementSubQuestionIndex, decrementQuestionIndex } from './../redux/actions/questionActions';
import {setPlayerState, resetRecorderState } from './../redux/actions/recorderActions';

// Components
import StoryTimerComponent from './../components/StoryTimerComponent';
import StoryRecordSectionComponent from './../components/StoryRecordSectionComponent';
import StoryQuestionSectionComponent from './../components/StoryQuestionSectionComponent';
import StoryButtonsComponent from '../components/StoryButtonsComponent';

// Icon
import IconComponent from './../components/IconComponent';

// Styles
import styles from './../styles/screens/StoryRecordingScreen';
import { COLOR, ICON_SIZE } from './../styles/styleHelpers';

const events = [TrackPlayerEvents.PLAYBACK_STATE, TrackPlayerEvents.PLAYBACK_QUEUE_ENDED];

const StoryRecordingScreen = ({
  // Question Reducer
  questionReducer,
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

  // Gets the player state and sets local state. Possible good way to handle state in future 
  useTrackPlayerEvents(events, async (event) => {
    if (event.type === TrackPlayerEvents.PLAYBACK_QUEUE_ENDED) {
      setCurrentPlaybackTracks();
    }
    return setPlayerState(event.state);
  });

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


  const setCurrentPlaybackTracks = async () => {
    const questionTrack = audioFileIdToTrack(currentQuestion().audioFile);
    const tracks = [questionTrack];
    if (currentQuestion().response === 'AUDIO') {
      // IF there is a recording it will play the recording after the question. As if it was the real thing
      tracks.push(channelIdToTrack(currentQuestion().channelId));
    };
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
  }

  const [timerSeconds, setTimerSeconds] = useState(0);
  const [recordedURL, setRecordedURL] = useState('');
  const playerState = recorderReducer.playerState;

  // timer use effect
  useEffect(() => {
    if (playerState === 'recording') {
      const interval = setInterval(() => {
        setTimerSeconds(timerSeconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    }, [timerSeconds, playerState]);



  const setQuestionResponse = (response) => {
    currentQuestion().response = response;
  };

  const setQuestionChannel = (chanId) => {
    currentQuestion().channelId = chanId;
  };

  const setQuestionAudioDuration = () => {
    currentQuestion().audioDuration = timerSeconds;
  };

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
  };


  // Loads questions.
  const onLoad = async () => {
    setIsInitialiseLoaded(false);
    initialiseAudioStream();
    setIsInitialiseLoaded(true);
    Platform.OS === 'android' ? await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]): null;

    await AudioRecord.init(options);
    await setCurrentPlaybackTracks();
    
  };

  // Pause Audio
  const pauseAudio = async () => {
    await TrackPlayer.pause();
    await setCurrentPlaybackTracks();
  };
  
  // Play audio
  const playAudio = async () => {
    await TrackPlayer.play();
  };

  // Start recording
  const onRecordStart = async () => {
    // grab a channel if none exists
    if (!currentQuestion().channelId)
      setQuestionChannel( getUnusedChannel());

    AudioRecord.start();
    
    // This is needed or it sends warns
    const audioData = AudioRecord.on('data', (data) => {
      const bufferChunk = Buffer.from(data, 'base64');
      audioStream(bufferChunk);
    });

    setSkipOption(false);
    return setPlayerState('recording');
  };

  // When user hits the pause.
  const onRecordPause = async () => {
    await AudioRecord.stop();
    setPlayerState("paused");
    setQuestionResponse('AUDIO');
    setQuestionAudioDuration();
    const onFinalQuestion = (questionIndex === questions.length - 1);
    await sequenceStream();
    await setCurrentPlaybackTracks(); // update audio playback
    return;
  };

  // Handles the back button out of subQuestions
  const onBackButton = async () => {

    // This prevents previous audio from playing when the user presses back. 
    setIsInitialiseLoaded(false);

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
    // if subQ is the last one
    if (subQuestionIndex === subQuestions.length - 1) {
      // Reset states to original 
      setSubQuestionActive(false);
      setSkipOption(true);
      setPlayerState('ready');
      resetSubQuestionIndex();
      incrementQuestionIndex();

      // If sub question is not the last one
    } else if (subQuestionActive && subQuestionIndex !== subQuestions.length - 1) {
      setPlayerState('ready');
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
      setPlayerState('ready');
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
    terminateChannels(questions);
    return resetQuestionReducerToOriginalState();
  };

  const channelIdToTrack = (channelId) => {
    return {
      id: 'recording',
      url: channelIdToUrl(channelId),
      title: 'TEST',
      artist: 'TEST',
    };
  };

  const audioFileIdToTrack = (audioFile) => {
    return {
      id: 'recording',
      url: audioFileIdToUrl(audioFile),
      title: 'TEST',
      artist: 'TEST',
    };
  };

  // This controls loads the questions.
  useEffect(() => {
    if (isInitialiseLoaded === false) {
      onLoad();
    };

    // update the recording timer based on any previous activity on this question
    // TODO: find a better way to manage this..
    let currentQuestionRecordedAudioDuration = currentQuestion().audioDuration;
    if (isNaN(currentQuestionRecordedAudioDuration)) 
      currentQuestionRecordedAudioDuration = 0;
    setTimerSeconds(currentQuestionRecordedAudioDuration);
  
  }, [playerState, questionIndex, subQuestionIndex]);


  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.crossIconContainer}>
        <TouchableOpacity onPress={() => onClose()}>
          <IconComponent
            name="times"
            type='font-awesome-5'
            size={ICON_SIZE.iconSizeMedium}
            style={{alignSelf: 'flex-start'}}
            color={COLOR.grey}
          />
        </TouchableOpacity>
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
          playAudio={() => playAudio()}
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Recorder reducer actions
    setPlayerState: (playerState) => dispatch(setPlayerState(playerState)),
    resetRecorderState: () => dispatch(resetRecorderState()),

    // Question reducer actions
    incrementQuestionIndex: () => dispatch(incrementQuestionIndex()),
    decrementQuestionIndex: () => dispatch(decrementQuestionIndex()),
    incrementSubQuestionIndex: () => dispatch(incrementSubQuestionIndex()),
    decrementSubQuestionIndex: () => dispatch(decrementSubQuestionIndex()),
    resetSubQuestionIndex: () => dispatch(resetSubQuestionIndex()),
    resetQuestionReducerToOriginalState: () => dispatch(resetQuestionReducerToOriginalState()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryRecordingScreen);