import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import { COLOR, ICON_SIZE } from './../styles/styleHelpers';
import styles from '../styles/components/StoryRecordSectionComponent';

const StoryRecordSectionComponent = ({playerState, onRecordStart, onRecordPause, pauseAudio}) => {

  // The below handles what icon, text and function displays based off the recording.  
  const handleDisplay = () => {
    switch (playerState) {
      case "IDLE":
        return (
          <View style={styles.mainContainer}>
            <Text style={styles.headerText}>When you're ready to answer press the record button below</Text>
            <TouchableOpacity style={styles.touchableOpacityButton} onPress={() => onRecordStart()}>
              <MaterialCommunityIcons
                name="microphone-outline"
                size={ICON_SIZE.iconSizeLarge}
                color={COLOR.white}
              />
            </TouchableOpacity>
          </View>
        )
      case "PAUSED":
        return (
          <View style={styles.mainContainer}>
            <Text style={styles.headerText}>For next question hit the next button or continue recording...</Text>
            <TouchableOpacity style={styles.touchableOpacityButton} onPress={onRecordStart}>
              <MaterialCommunityIcons
                name="microphone-outline"
                size={ICON_SIZE.iconSizeLarge}
                color={COLOR.white}
              />
            </TouchableOpacity>
          </View>
        )
      case "RECORDING": 
        return (
          <View style={styles.mainContainer}>
            <Text style={styles.headerText}>To stop recording press the below button...</Text>
            <TouchableOpacity style={styles.touchableOpacityButton} onPress={onRecordPause}>
              <MaterialCommunityIcons
                name="pause"
                size={ICON_SIZE.iconSizeLarge}
                color={COLOR.white}
              />
            </TouchableOpacity>
          </View>
        )
      case "PLAYING":
        return (
            <View style={styles.mainContainer}>
              <Text style={styles.headerText}>Press the below button to stop listening to question...</Text>
              <TouchableOpacity style={styles.touchableOpacityButton} onPress={() => pauseAudio()}>
                <MaterialCommunityIcons
                  name="pause"
                  size={ICON_SIZE.iconSizeLarge}
                  color={COLOR.white}
                />
              </TouchableOpacity>
          </View>
        )
      default:
        break;
    }
  };

  return (
    <View>
      {handleDisplay()}
    </View>
  );
};

export default StoryRecordSectionComponent;