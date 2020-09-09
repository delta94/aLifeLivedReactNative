import { StyleSheet } from 'react-native';
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
    flex: FLEX.flexOne,
  },

  avatarContainer: {
    alignItems: 'center',
    flex: 2,
    marginBottom: 30,
  },

  icon: {
    marginTop: 20,
    alignSelf: 'flex-start',
    marginLeft: 20
  },

  textInputContainer: {
    alignItems: 'center',
  },

  errorMessage: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'red',
  },

  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
});

export default styles;