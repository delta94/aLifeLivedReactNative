import {StyleSheet} from 'react-native';
import {COLOR} from '../styleHelpers';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: 350,
    borderWidth: 0.5,
    borderColor: COLOR.grey,
  },

  title: {
    color: COLOR.grey,
    fontWeight: 'bold',
  },
});

export default styles;
