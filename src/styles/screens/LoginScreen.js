import {StyleSheet} from 'react-native';
import {FLEX, COLOR, FONT_SIZE} from './../styleHelpers';

const styles = StyleSheet.create({
  container: {
    flex: FLEX.flexOne,
    backgroundColor: COLOR.white,
    display: 'flex',
    justifyContent: 'space-around',
  },

  icon: {
    marginLeft: 20,
  },

  texInputContainer: {
    alignItems: 'center',
    marginBottom: 200
  },

  textContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },

  errorMessage: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'red',
  },

  buttonContainer: {
    alignItems: 'center',
  },

  header: {
    color: COLOR.grey,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xLargeSize,
    marginBottom: 20,
  },
});

export default styles;
