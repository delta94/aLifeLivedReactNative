import { StyleSheet } from 'react-native';
import { FLEX, COLOR, FONT_SIZE } from './../styleHelpers';

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
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: COLOR.white,
    flex: FLEX.flexOne,
  },

  avatarContainer: {
    alignItems: "center",
    flex: 2,
    marginBottom: 30
  },

  icon: {
    marginLeft: 15,
    marginTop: 20, 
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