import { StyleSheet, Platform } from 'react-native';
import { COLOR, FONT_SIZE, BORDER_RADIUS, HEADER_MARGINS } from './../styleHelpers';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.limeGreen,
  },

  headerContainer: {
    flex: 1,
    marginTop: 50,
  },

  crossIconContainer: {
    marginLeft: 20,
    alignSelf: "flex-start"
  },

  timerContainer: {
    alignSelf: "center"
  },

  questionContainer: {
    flex: 1,
    alignSelf: "center"
  },

  footer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderTopEndRadius: BORDER_RADIUS.medium,
    borderTopLeftRadius: BORDER_RADIUS.medium,
    backgroundColor: COLOR.white,
  },

  footerButtonContainer: {
    alignSelf: 'flex-end',
    marginRight: 20
  }
});

export default styles;
