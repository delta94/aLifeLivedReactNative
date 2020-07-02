import { StyleSheet, Platform } from 'react-native';
import { FLEX, COLOR, FONT_SIZE, BORDER_RADIUS, HEADER_MARGINS } from './../styleHelpers';

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
    marginBottom: Platform.isPad ? 500 : 200
  },

  headerText: {
    color: COLOR.grey,
    marginLeft: 20,
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.largeSize,
  },

  footer: {
    borderTopEndRadius: BORDER_RADIUS.medium,
    borderTopLeftRadius: BORDER_RADIUS.medium,
    backgroundColor: COLOR.white,
    flex: FLEX.flexOne,
  },

  contentContainer: {
    marginTop: 50
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

  errorMessage: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'red',
  },

  buttonContainer: {
    marginTop: 0,
    marginRight: 20,
    alignItems: 'flex-end',
  },
});

export default styles;
