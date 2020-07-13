import { StyleSheet } from 'react-native';
import { COLOR, FONT_SIZE } from './../styleHelpers';

const styles = StyleSheet.create({
  mainContainer: { 
    display: 'flex', 
    alignItems: 'center',
  },

  touchableOpacityButton: {
    margin: 10,
    borderRadius: 40,
    backgroundColor: COLOR.limeGreen,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70
  },

  headerText: {
    color: COLOR.grey,
    marginTop: 0, 
    margin: 10,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.largeSize,
  },
});

export default styles;
