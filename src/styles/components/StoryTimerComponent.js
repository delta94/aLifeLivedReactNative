import { StyleSheet, Platform } from 'react-native';
import { COLOR, FONT_SIZE, BORDER_RADIUS, HEADER_MARGINS } from './../styleHelpers';

const styles = StyleSheet.create({

  mainContainer: {
    display: 'flex', 
    alignItems: 'center'
  },
  statusContainer: {
    display: "flex", 
    flexDirection: 'row', 
    alignItems: 'center'
  },

  recordingSymbol: {
    width: 10, 
    height: 10, 
    backgroundColor: 'red', 
    borderRadius: 5,
    marginRight: 10
  }
});

export default styles;
