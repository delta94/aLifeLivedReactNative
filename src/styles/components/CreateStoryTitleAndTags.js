import {StyleSheet} from 'react-native';
import {COLOR, FONT_SIZE} from '../styleHelpers';

const styles = StyleSheet.create({

  tagContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  touchableOpacityButton: {
    borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    marginBottom: 15,
    borderRadius: 10,
  },

  touchableOpacityButtonActive: {
    borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: COLOR.limeGreen,
  },

  touchableOpacityText: {
    alignSelf: 'center',
    flexWrap: "wrap",
    color: COLOR.grey,
    fontWeight: "bold",
    fontSize: FONT_SIZE.mediumSize,
  },

  touchableOpacityTextActive: {
    alignSelf: 'center',
    flexWrap: "wrap",
    color: COLOR.white,
    fontWeight: "bold",
    fontSize: FONT_SIZE.mediumSize
  },

  footerHeaderText: {
    color: COLOR.grey,
    margin: 15,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.mediumSize,
  },
});

export default styles;
