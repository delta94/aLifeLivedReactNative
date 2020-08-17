import {StyleSheet} from 'react-native';
import {COLOR} from '../styleHelpers';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR.grey,
  },

  squareContainer: {
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR.grey,
    borderRadius: 10
  },

  squareImage: {
    borderRadius: 10,
  },

  iconColor: {
    color: COLOR.grey,
  }
});

export default styles;
