import { StyleSheet } from 'react-native';
import { COLOR, FONT_SIZE } from './../styleHelpers';

const styles = StyleSheet.create({

  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  touchableOpacityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  questionTitle: {
    color: COLOR.white,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.largeSize,
  },

  questionTitleContainer: {
    marginBottom: 30
  }
});

export default styles;