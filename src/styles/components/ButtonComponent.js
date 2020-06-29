import {StyleSheet} from 'react-native';
import {COLOR, FONT_SIZE} from '../styleHelpers';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: 350,
    borderWidth: 0.5,
    borderColor: COLOR.grey
  },

  button: {
    backgroundColor: COLOR.limeGreen,
  },

  title: {
    color: COLOR.grey,
    fontWeight: "bold"
  }
});

export default styles;
