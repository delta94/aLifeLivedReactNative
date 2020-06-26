import {StyleSheet} from 'react-native';
import {COLOR, FONT_SIZE} from '../styleHelpers';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: 350
  },

  button: {
    backgroundColor: COLOR.limeGreen
  },

  title: {
    color: COLOR.grey,
    fontWeight: "bold"
  }
});

export default styles;
