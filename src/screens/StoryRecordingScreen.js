import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Buffer} from 'buffer';
import {connect} from 'react-redux';
import TrackPlayer, { pause } from 'react-native-track-player';
import RNFS from 'react-native-fs'; 

import AudioRecord from 'react-native-audio-record';

// API
import {audioStream, initialiseStream, finaliseStream} from './../api/postRequests/audioStream';
import {imageUpload} from './../api/postRequests/imageUpload';

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
import { Platform } from 'react-native';

const StoryRecordingScreen = ({navigation, questionReducer, saveAllQuestions}) => {

  // TODO:
  // 1. When the user hits the back button they should go back to the previous state with the recording and the timer the same. 
  // 2. User needs to be able to record, recording should then go to the AWS server when they hit the next button. 
  const options = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    wavFile: 'changedFile.wav', // default 'audio.wav'
  };

  // Recording States
  const [recordingStatus, setRecordingStatus] = useState("IDLE");
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [recordedAudioFile, setAudioFile] = useState(null);

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
    await TrackPlayer.stop();
    return setRecordingStatus("IDLE");
  };

  // Play audio
  const playAudio = async (questionAudioURL, questionID, questionTitle) => {
    const file = RNFS.readDir(RNFS.DocumentDirectoryPath).then((result) => {
      // Search file looks through the file in the directory and finds the correct file to play. 
      return searchFile(result, recordedAudioFile)
    });

    console.log(await file);
    // Add a track to the queue
    await TrackPlayer.add({
      id: questionID,
      url: recordedAudioFile,
      title: questionTitle,
      artist: questionTitle,
    });

    await TrackPlayer.play();
    return setRecordingStatus("PLAYING");
  }

  // When recording mic icon.
  const onRecordStart = async () => {
    initialiseStream();
    AudioRecord.start();
    const audioData = AudioRecord.on('data', (data) => {
      const bufferChunk = Buffer.from(data, 'base64');
      audioStream(bufferChunk);
    });
    return setRecordingStatus("RECORDING")
  };
 
  // When user hits the pause icon.
  const onRecordPause = async () => {
    const audioFile = await AudioRecord.stop();

    finaliseStream();

    return setRecordingStatus("PAUSED");
  };

  // When the user goes to the next question the below states are reset.
  const onNextButton = () => {
    if (questionIndex === questions.length - 1) {
      console.log("END")
      return;
    } 

    setTimerSeconds(0);
    setRecordingStatus("IDLE");
    return setQuestionIndex(questionIndex + 1)
  };

  // This controls the timer and loads the questions.
  useEffect(() => {
    onLoad();
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
          playAudio={(questionAudioURL, questionID, questionTitle) => playAudio(questionAudioURL, questionID, questionTitle)}
          pauseAudio={() => pauseAudio()}
          questionAudioPlaying={(isAudioPlaying) => setRecordingStatus(isAudioPlaying)}
          capturedAudio={recordedAudioFile}
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