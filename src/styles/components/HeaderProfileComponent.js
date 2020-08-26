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
    alignContent: 'center',
    justifyContent: 'space-between',
    margin: 10
  },

  iconContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start'
  },

  touchableOpacityButton: {
    margin: 10
  },

  textContainer: {
    margin: 10,
    display: "flex",
    flexDirection: "column",
  },

  headerText: {
    color: COLOR.grey,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.xLargeSize,
  },

  subText: {
    color: COLOR.grey,
    fontSize: FONT_SIZE.largeSize,
    textDecorationLine: 'underline'
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
