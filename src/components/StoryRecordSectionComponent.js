import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import { COLOR, ICON_SIZE } from './../styles/styleHelpers';
import styles from '../styles/components/StoryRecordSectionComponent';

const StoryRecordSectionComponent = ({recordingStatus, onRecordStart, onRecordPause, pauseAudio}) => {

  
  const manageIconDisplay = () => {
    switch (recordingStatus) {
      case 'IDLE':
        return (
          <View>
            <MaterialCommunityIcons
              name="microphone-outline"
              size={ICON_SIZE.iconSizeLarge}
              color={COLOR.white}
            />
          </View>
        );
      case 'PAUSED':
        return (
          <View>
            <MaterialCommunityIcons
              name="microphone-outline"
              size={ICON_SIZE.iconSizeLarge}
              color={COLOR.white}
            />
          </View>
        );
      case 'RECORDING':
        return (
          <MaterialCommunityIcons
            name="pause"
            size={ICON_SIZE.iconSizeLarge}
            color={COLOR.white}
          />
        );
      case 'PLAYING':
        return (
          <MaterialCommunityIcons
            name="pause"
            size={ICON_SIZE.iconSizeLarge}
            color={COLOR.white}
          />
        );
      default:
        break;
    };
  };

  const handleTextDisplay = () => {
    switch (recordingStatus) {
      case "IDLE":
        return (
          <View style={styles.mainContainer}>
            <Text style={styles.headerText}>When you're ready to answer press the record button below</Text>
            <TouchableOpacity style={styles.touchableOpacityButton} onPress={onRecordStart}>
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
          <Text style={styles.headerText}>To continue to the next question hit the next button</Text>
        )
      case "RECORDING": 
        return (
          <View style={styles.mainContainer}>
            <Text style={styles.headerText}>When you're ready to answer press the record button below</Text>
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
              <Text style={styles.headerText}>When you're ready to answer press the record button below</Text>
              <TouchableOpacity style={styles.touchableOpacityButton} onPress={pauseAudio}>
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
      {handleTextDisplay()}

    </View>
  );
};

export default StoryRecordSectionComponent;