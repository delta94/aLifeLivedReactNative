import { StyleSheet, Platform } from 'react-native';
import { FLEX, COLOR, FONT_SIZE, BORDER_RADIUS, HEADER_MARGINS } from './../styleHelpers';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.limeGreen,
  },

  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: HEADER_MARGINS.marginTop,
    marginBottom: Platform.isPad ? 500 : 50,
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

  footerHeaderText: {
    color: COLOR.grey,
    margin: 15,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.mediumSize,
  },

  contentContainer: {
    marginTop: 30,
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

  buttonFooter: {
    paddingBottom: 15,
    backgroundColor: COLOR.white,
  },

  buttonContainer: {
    margin: 20,
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
