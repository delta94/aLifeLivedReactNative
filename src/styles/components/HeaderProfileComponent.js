import { StyleSheet } from 'react-native';
import { COLOR, FONT_SIZE } from '../styleHelpers';

const styles = StyleSheet.create({

  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center'
  },

  avatarAndTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    margin: 10
  },

  textContainer: {
    margin: 10,
    display: "flex",
    flexDirection: "column"
  },

  headerText: {
    color: COLOR.white,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.largeSize
  },

  subText: {
    color: COLOR.white,
    fontSize: FONT_SIZE.mediumSize
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row"
  },
  
  button: {
    margin: 10
  },
});

export default styles;
