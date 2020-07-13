import { StyleSheet } from 'react-native';
import { COLOR, BORDER_RADIUS } from './../styleHelpers';

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
    width: '100%',
    alignSelf: "center"
  },

  footer: {
    flex: 1.5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderTopEndRadius: BORDER_RADIUS.medium,
    borderTopLeftRadius: BORDER_RADIUS.medium,
    backgroundColor: COLOR.white,
  },

  footerButtonContainer: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  }
});

export default styles;
