import { StyleSheet } from 'react-native';
import { COLOR, FONT_SIZE } from '../styleHelpers';

const styles = StyleSheet.create({

  header: {
  },

  touchableOpacityButton: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10
  },

  touchableOpacityButtonActive: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: COLOR.limeGreen,
  }, 

  buttonHeader: {
    fontWeight: "bold",
    color: COLOR.grey,
    fontSize: FONT_SIZE.mediumSize
  },

  buttonHeaderActive: {
    fontWeight: "bold",
    color: COLOR.white,
    fontSize: FONT_SIZE.mediumSize
  },

  buttonSubText: {
    color: COLOR.grey,
    fontSize: FONT_SIZE.mediumSize
  },

  buttonSubTextActive: {
    color: COLOR.white,
    fontSize: FONT_SIZE.mediumSize
  }
});

export default styles;