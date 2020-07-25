import React, {useState, useEffect} from 'react';
import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import {Buffer} from 'buffer';
import {connect} from 'react-redux';
import TrackPlayer, {useTrackPlayerEvents, useTrackPlayerProgress, TrackPlayerEvents} from 'react-native-track-player';
import RNFS from 'react-native-fs'; 

import AudioRecord from 'react-native-audio-record';

// API
import {audioStream} from './../api/postRequests/audioStream';
import {imageUpload} from './../api/postRequests/imageUpload'; // This will eventually be changed to a file upload or a file stream.
import {createResponse} from './../api/postRequests/response';
import {getSubQuestionFromQuestionID} from './../api/getRequests/getSubQuestions';

// Actions
import { saveAllQuestions } from './../redux/actions/questionActions';

// Helpers
import {searchFile} from './../helpers/searchFile';

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

const StoryRecordingScreen = ({navigation, questionReducer}) => {

  const {position, bufferedPosition, duration} = useTrackPlayerProgress(); // Gets the position and duration of the recording.

  const events = [
    TrackPlayerEvents.PLAYBACK_STATE,
    TrackPlayerEvents.PLAYBACK_ERROR,
    TrackPlayerEvents.PLAYBACK_QUEUE_ENDED,
  ];  

  // Gets the state of the player and also get resets state when player ends
  useTrackPlayerEvents(events, async (event) => {
    event.type === 'playback-queue-ended' ? setPlayerState("IDLE") : null;
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
  const [playerState, setPlayerState] = useState("IDLE");

  // Recording States
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [recordedURL, setRecordedURL] = useState("");

  // Questions state
  const [questions, setQuestions] = useState(questionReducer.questions);
  const [questionIndex, setQuestionIndex] = useState(0);

  // Sub Question state
  const [subQuestionActive, setSubQuestionActive] = useState(false);
  const [subQuestions, setSubQuestions] = useState(null);
  const [subQuestionIndex, setSubQuestionIndex] = useState(null);

  // Loads questions.
  const onLoad = async () => {
    Platform.OS === "android" ? (    
      await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ])) : null;

    await AudioRecord.init(options);
    await setQuestions(questionReducer.questions);
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
    };
 
    await TrackPlayer.play();
    return setPlayerState("PLAYING");
  };

  // Start recording
  const onRecordStart = async () => {
    AudioRecord.start();
    const audioData = AudioRecord.on('data', (data) => {

    });

    setSkipOption(false);
    return setPlayerState('RECORDING');
  };
 
  // When user hits the pause.
  const onRecordPause = async () => {
    const audioFile = await AudioRecord.stop();
    
    // TODO: Remove the below section when streaming file is complete and working. 
    const file = await RNFS.readDir(RNFS.DocumentDirectoryPath).then(async (result) => {
      // Search file looks through the file in the directory and finds the correct file to play.
      return searchFile(result, audioFile);
    });
    
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
    };
  
    return setPlayerState('PAUSED');
  };

  // When the user goes to the next question the below states are reset.
  const onNextButton = (userSelectedOption) => {
    setIsLoading(true);
  
    // When there are no more questions left
    if (questionIndex === questions.length - 1) {
      console.log("END")
      return;
    };

    // If no recording then user can skip 
    if (skipOption === false) {
      try {
        createResponse(recordedURL, questions[questionIndex].id);
      } catch (error) {
        setIsLoading(false);
        console.log(error) 
      }
    };

    // Handle if the user selects yes or no then filters the subQuestions accordingly.
    if (userSelectedOption) {
      // Filters the array and sees if there are any yes decision types
      const filteredSubQuestions = subQuestions.filter((subQuestion) => {
        return subQuestion.decisionType == "YES";
      });
      filteredSubQuestions.length <= 0 ? setSubQuestions([]) : setSubQuestions(filteredSubQuestions);
      return setQuestionIndex(questionIndex + 1);
    } else if (!userSelectedOption) {

    };

    // TODO: Maybe make this into a function and put into a helper file and put the above yes or no handlers in.
    // Handle if master question has sub question
    if (subQuestionIndex === subQuestions.length - 1) {
      setIsLoading(false);
    } else if (subQuestions && subQuestionIndex <= subQuestions.length -1) {
      // Below handles the onload, default set to null to handle the first question. 
      subQuestionIndex === null ? setSubQuestionIndex(0) : setSubQuestionIndex(subQuestionIndex + 1);
      setSubQuestionActive(true);
      setIsLoading(false);
      return;
    };

    // Reset states
    setSubQuestionIndex(null);
    setSubQuestionActive(false);
    setTimerSeconds(0);
    setSkipOption(true);
    setPlayerState('IDLE');
    setIsLoading(false);
    return setQuestionIndex(questionIndex + 1);
  };

  // The below handles if there is a subQuestion linked to the master question
  const handleIfSubQuestion = async () => {
    if (questions[questionIndex].subQuestions) {
      const responseData = await getSubQuestionFromQuestionID(questions[questionIndex].id);
      return setSubQuestions(responseData);
    }
  };

  // This controls the timer and loads the questions.
  useEffect(() => {
    handleIfSubQuestion();
    onLoad();

    if (playerState === 'RECORDING') {
      setTimeout(() => {
        setTimerSeconds(timerSeconds + 1);
      }, 1000);
    }
  }, [timerSeconds, playerState, questionIndex, subQuestionIndex]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.crossIconContainer}>
          <AntDesign
            name="close"
            size={ICON_SIZE.iconSizeMedium}
            color={COLOR.grey}
            style={styles.icon}
            onPress={() => navigation.reset({routes: [{name: 'Home'}]})}
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
          questionAudioURL={questions[questionIndex].isYesOrNo ? null : questions[questionIndex].audioFileURL}
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
        { questions[questionIndex].isYesOrNo ? (
          <Text style={styles.headerText}>Please select one of the below options...</Text>
        ) : 
          <StoryRecordSectionComponent
            playerState={playerState}
            recordedURL={recordedURL}
            pauseAudio={() => pauseAudio()}
            onRecordPause={() => onRecordPause()}
            onRecordStart={() => onRecordStart()}
          />
        }
        <StoryButtonsComponent  
          questionIndex={questionIndex}
          playerState={playerState}
          isLoading={isLoading}
          questions={questions}
          isYesOrNo={questions[questionIndex].isYesOrNo}
          handleOnYesOrNoButtonPress={(userSelectedOption) => onNextButton(userSelectedOption)}
          setQuestionIndex={() => setQuestionIndex(questionIndex - 1)}
          skipOption={skipOption}
        />
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