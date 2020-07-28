import {StyleSheet, Platform} from 'react-native';
import {FLEX, COLOR, FONT_SIZE, BORDER_RADIUS, HEADER_MARGINS} from './../styleHelpers';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.limeGreen,
  },

  headerContainer: {
    backgroundColor: COLOR.limeGreen,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: HEADER_MARGINS.marginTop,
    marginBottom: HEADER_MARGINS.marginBottom,
  },

  headerText: {
    color: COLOR.grey,
    marginLeft: 20,
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.largeSize,
  },

  footer: {
    flex: 1,
    borderTopEndRadius: BORDER_RADIUS.medium,
    borderTopLeftRadius: BORDER_RADIUS.medium,
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: COLOR.white,
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

  textInputContainer: {
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
