import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import { COLOR, ICON_SIZE } from './../styles/styleHelpers';
import styles from '../styles/components/StoryRecordSectionComponent';

const StoryRecordSectionComponent = ({recordingStatus, onRecordStart, onRecordPause}) => {

  
  const manageIconDisplay = () => {
    switch (recordingStatus) {
      case "IDLE":
        return (
          <View>
            <MaterialCommunityIcons
              name="microphone-outline"
              size={ICON_SIZE.iconSizeLarge}
              color={COLOR.white}
            />
          </View>
        )
      case "PAUSED": 
        return (
          <View>
            <MaterialCommunityIcons
              name="microphone-outline"
              size={ICON_SIZE.iconSizeLarge}
              color={COLOR.white}
            />
          </View>
        )
      case "RECORDING": 
        return (
          <MaterialCommunityIcons
            name="pause"
            size={ICON_SIZE.iconSizeLarge}
            color={COLOR.white}
          />
        )
      default:
        break;
    };
  };

  const handleTextDisplay = () => {
    switch (recordingStatus) {
      case "IDLE":
        return (
          <Text style={styles.headerText}>When you're ready to answer press the record button below</Text>
        )
      case "PAUSED":
        return (
          <Text style={styles.headerText}>To continue to the next question hit the next button</Text>
        )
      case "RECORDING": 
        return (
          <Text style={styles.headerText}>When you're ready to answer press the record button below</Text>
        )
      default:
        break;
    }
  }

  return (
    <View style={styles.mainContainer}>
      {handleTextDisplay()}
      <TouchableOpacity style={styles.touchableOpacityButton} onPress={recordingStatus === "RECORDING" ? onRecordPause : onRecordStart}>
        {manageIconDisplay()}
      </TouchableOpacity>
    </View>
  );
};

export default StoryRecordSectionComponent;