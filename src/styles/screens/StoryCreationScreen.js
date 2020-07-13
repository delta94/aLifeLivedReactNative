import {StyleSheet} from 'react-native';
import {COLOR, FONT_SIZE, BORDER_RADIUS} from './../styleHelpers';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.limeGreen,
  },

  headerContainer: {
    flex: 1,
    marginTop: 50,
    marginLeft: 10,
  },

  crossIconContainer: {
    marginLeft: 20,
    alignSelf: "flex-start"
  },

  headerText: {
    color: COLOR.grey,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.largeSize,
  },

  footer: {
    flex: 3.5,
    backgroundColor: COLOR.white,
    borderTopEndRadius: BORDER_RADIUS.medium,
    borderTopLeftRadius: BORDER_RADIUS.medium,
  },

  contentContainer: {
    marginTop: 30,
    borderTopEndRadius: BORDER_RADIUS.medium,
    borderTopLeftRadius: BORDER_RADIUS.medium,
  },

  footerHeaderText: {
    color: COLOR.grey,
    margin: 15,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.mediumSize,
  },

  buttonFooter: {
    display: 'flex',
    flexDirection:'column',
    backgroundColor: COLOR.white,
  },

  buttonContainer: {
    margin: 20,
    marginBottom: 30,
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
