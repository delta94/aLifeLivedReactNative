import {StyleSheet} from 'react-native';
import {COLOR, FONT_SIZE} from '../styleHelpers';

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },

  placeHolder: {
    color: COLOR.grey
  },

  labelText: {
    color: COLOR.grey,
    marginTop: 20,
    marginBottom: 20,
  },

  textInput: {
    color: COLOR.grey,
    fontSize: FONT_SIZE.mediumSize,
    backgroundColor: COLOR.white,
    height: 50,
    width: 350,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLOR.black,
  },

  textStyle: {
    paddingLeft: 10,
    color: COLOR.grey,
  },

  textInputLarge: {
    color: COLOR.black,
    fontSize: FONT_SIZE.mediumSize,
    backgroundColor: COLOR.white,
    height: 100,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLOR.black,
  },
});

export default styles;
