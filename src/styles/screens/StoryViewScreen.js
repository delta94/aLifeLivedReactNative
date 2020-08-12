import { StyleSheet } from 'react-native';
import { COLOR, BORDER_RADIUS, FONT_SIZE } from './../styleHelpers';

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flex: 1,
  },

  headerContainer: {
    flex: 0.5,
    backgroundColor: COLOR.white,
    paddingTop: 50,
    paddingLeft: 10,
    paddingBottom: 50,
    borderBottomLeftRadius: BORDER_RADIUS.medium,
    borderBottomRightRadius: BORDER_RADIUS.medium,
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,
  },

  headerTextContainer: {
    marginLeft: 10,
    display: 'flex',
    flexWrap: 'nowrap',
  },

  headerTitleText: {
    color: COLOR.limeGreen,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.largeSize,
  },

  headerDescriptionText: {
    color: COLOR.grey,
    fontSize: FONT_SIZE.largeSize,
    marginTop: 10,
  },

  middleContainer: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  middleText: {
    color: COLOR.limeGreen,
    fontSize: FONT_SIZE.largeSize,
    fontWeight: "bold",
  },

  bottomContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    paddingTop: 30,
    backgroundColor: COLOR.white,
    borderTopLeftRadius: BORDER_RADIUS.medium,
    borderTopRightRadius: BORDER_RADIUS.medium,
  },

  audioControllerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  bookMarkContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
});

export default styles;