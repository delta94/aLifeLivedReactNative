import { StyleSheet } from 'react-native';
import { COLOR, BORDER_RADIUS, FONT_SIZE } from './../styleHelpers';

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
    alignSelf: 'flex-start',
  },

  timerContainer: {
    alignSelf: 'center',
  },

  questionContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },

  headerText: {
    color: COLOR.grey,
    marginTop: 0,
    textAlign: 'left',
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.largeSize,
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
});

export default styles;
