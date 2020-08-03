import {StyleSheet} from 'react-native';
import {COLOR, FONT_SIZE} from '../styleHelpers';

const styles = StyleSheet.create({

  tagContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  touchableOpacityButton: {
    borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    marginBottom: 15,
    borderRadius: 10,
  },

  touchableOpacityText: {
    alignSelf: 'center',
    flexWrap: "wrap"
  },

  footerHeaderText: {
    color: COLOR.grey,
    margin: 15,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.mediumSize,
  },

  buttonHeader: {
    fontWeight: 'bold',
    color: COLOR.grey,
    fontSize: FONT_SIZE.mediumSize,
  },

  buttonHeaderActive: {
    fontWeight: 'bold',
    color: COLOR.white,
    fontSize: FONT_SIZE.mediumSize,
  },

  buttonSubText: {
    color: COLOR.grey,
    fontSize: FONT_SIZE.mediumSize,
  },

  buttonSubTextActive: {
    color: COLOR.white,
    fontSize: FONT_SIZE.mediumSize,
  },
});

export default styles;
