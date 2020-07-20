import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Buffer} from 'buffer';
import {connect} from 'react-redux';
import TrackPlayer, {pause, useTrackPlayerEvents, useTrackPlayerProgress, TrackPlayerEvents, STATE_PLAYING} from 'react-native-track-player';
import RNFS from 'react-native-fs'; 

import AudioRecord from 'react-native-audio-record';

// API
import {audioStream} from './../api/postRequests/audioStream';
import {imageUpload} from './../api/postRequests/imageUpload'; // This will eventually be changed to a file upload or a file stream.
import {createResponse} from './../api/postRequests/response';

// Actions
import { saveAllQuestions } from './../redux/actions/questionActions';

// Helpers
import {searchFile} from './../helpers/searchFile';

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
    wavFile: 'changedFile.wav', // default 'audio.wav'
  };

  // Button states
  const [skipOption, setSkipOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Recording States
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [recordedAudioFile, setAudioFile] = useState(null);
  const [recordedURL, setRecordedURL] = useState("");

  const [playerState, setPlayerState] = useState("IDLE");


  // Questions state
  const [questions, setQuestions] = useState(questionReducer.questions);
  const [questionIndex, setQuestionIndex] = useState(0);

  // Loads questions.
  const onLoad = async () => {
    AudioRecord.init(options);
    await setQuestions(questionReducer.questions);
  };

  // Pause Audio
  const pauseAudio = async () => {
    return await TrackPlayer.stop();
  };

  // Play audio
  const playAudio = async (questionAudioURL, questionID, questionTitle) => {
    const file = RNFS.readDir(RNFS.DocumentDirectoryPath).then((result) => {
      // Search file looks through the file in the directory and finds the correct file to play. 
      return searchFile(result, recordedAudioFile)
    });

    // Add a track to the queue
    await TrackPlayer.add({
      id: questionID,
      url: questionAudioURL,
      title: questionTitle,
      artist: questionTitle,
    });

    // IF there is a recording it will play the recording after the question. As if it was the real thing
    if (recordedURL) {
      await TrackPlayer.add({
        id: 'recording',
        url: recordedURL,
        title: questionTitle,
        artist: questionTitle,
      });
    }
    await TrackPlayer.play();
    return setPlayerState("PLAYING")
  }

  // Start recording
  const onRecordStart = async () => {
    AudioRecord.start();
    const audioData = AudioRecord.on('data', (data) => {
      // const bufferChunk = Buffer.from(data, 'base64');
      // audioStream(bufferChunk);
    });

    setSkipOption(false);
    return setPlayerState('RECORDING');
  };
 
  // When user hits the pause.
  const onRecordPause = async () => {
    const audioFile = await AudioRecord.stop();
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
  const onNextButton = () => {
    setIsLoading(true);
    
    if (questionIndex === questions.length - 1) {
      console.log("END")
      return;
    };

    // If no recording then user skips 
    if (skipOption === false) {
      try {
        createResponse(recordedURL, questions[questionIndex].id);
      } catch (error) {
        setIsLoading(false);
        console.log(error) 
      }
    };

    // Reset states
    setTimerSeconds(0);
    setSkipOption(true);
    setPlayerState('IDLE');
    setIsLoading(false);
    return setQuestionIndex(questionIndex + 1)
  };

  // The below handles what text will display on the button
  const onNextButtonText = () => {
    if (questionIndex === questions.length - 1) {
      return "Finish"
    } else if (skipOption) {
      return "Skip"
    } else {
      return "Next"
    }
  };

  // This controls the timer and loads the questions.
  useEffect(() => {
    onLoad();
    if (playerState === 'RECORDING') {
      setTimeout(() => {
        setTimerSeconds(timerSeconds + 1);
      }, 1000);
    }
  }, [timerSeconds, playerState, playerState]);

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
          questionTitle={questions ? questions[questionIndex].title : null}
          questionAudioURL={
            questions ? questions[questionIndex].audioFileURL : null
          }
          questionID={questions ? questions[questionIndex].id : null}
          playerState={playerState}
          playAudio={(questionAudioURL, questionID, questionTitle) =>
            playAudio(questionAudioURL, questionID, questionTitle)
          }
          pauseAudio={() => pauseAudio()}
          questionAudioPlaying={(isAudioPlaying) =>
            setPlayerState(isAudioPlaying)
          }
          capturedAudio={recordedAudioFile}
        />
      </View>

      <View style={styles.footer}>
        <StoryRecordSectionComponent
          playerState={playerState}
          pauseAudio={() => pauseAudio()}
          onRecordPause={() => onRecordPause()}
          onRecordStart={() => onRecordStart()}
        />
        <View style={styles.footerButtonContainer}>
          {questionIndex <= 0 ? (
            <View></View>
          ) : (
            <ButtonComponent
              title={'Back'}
              buttonSize="small"
              onButtonPress={() => setQuestionIndex(questionIndex - 1)}
              disabled={
                playerState === 'playing' || playerState === 'RECORDING'
                  ? true
                  : false
              }
            />
          )}
          <ButtonComponent
            title={onNextButtonText()}
            buttonSize="small"
            onButtonPress={() => onNextButton()}
            disabled={
              playerState === 'playing' || playerState === 'RECORDING'
                ? true
                : false
            }
            isLoading={isLoading}
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