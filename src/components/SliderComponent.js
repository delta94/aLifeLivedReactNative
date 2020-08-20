import React from 'react';
import {View, Text} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Slider from '@react-native-community/slider';

// Styles
import {COLOR} from './../styles/styleHelpers';

const SliderComponent = ({maxValue, currentPosition}) => {

  // Converts the seconds into readable hours, minutes and seconds 
  const buildTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Allows us to have 00:00 
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${minutesStr}:${secondsStr}`;
    }

    return `${minutesStr}:${secondsStr}`;
  };

  return (
    <>
      <Slider
        style={{width: '100%', height: 40}}
        minimumValue={0}
        maximumValue={maxValue}
        value={currentPosition}
        onValueChange={value => {
          TrackPlayer.seekTo(value)
        }}
        minimumTrackTintColor={COLOR.limeGreen}
        maximumTrackTintColor={`${COLOR.limeGreen}50`}
      />
      <View style={{display: "flex", flexDirection: "row", justifyContent: 'space-between'}}>
        <Text>{buildTime(currentPosition)}</Text>
        <Text>-{buildTime(maxValue - currentPosition)}</Text>
      </View>
    </>
  );
};

export default SliderComponent;