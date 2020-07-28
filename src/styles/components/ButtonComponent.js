import {StyleSheet} from 'react-native';
import {COLOR, FONT_SIZE} from '../styleHelpers';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: 350
  }, 
  
  buttonSmallContainer: {
    width: 100
  },

  button: {
    backgroundColor: COLOR.limeGreen,
  },

  backButton: {
    backgroundColor: COLOR.grey,
  },

  title: {
    color: COLOR.white,
    fontWeight: "bold"
  },

  disabledButton: {
    backgroundColor: COLOR.lightGrey,
    color: COLOR.white
  }
});

export default styles;
