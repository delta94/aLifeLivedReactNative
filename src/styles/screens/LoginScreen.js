import {StyleSheet} from 'react-native';
import {FLEX, COLOR, FONT_SIZE} from './../styleHelpers';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.grey,
  },

  headerContainer: {
    backgroundColor: COLOR.grey,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 100,
  },

  headerText: {
    color: COLOR.limeGreen,
    marginLeft: 20,
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.largeSize
  },

  footer: {
    flex: 1,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: COLOR.white,
    flex: FLEX.flexOne,
  },

  icon: {
    marginLeft: 15,
    marginTop: 20,
  },

  header: {
    color: COLOR.grey,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xLargeSize,
  },

  texInputContainer: {
    alignItems: 'center',
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
    marginTop: 100,
    alignItems: 'center',
  },
});

export default styles;
