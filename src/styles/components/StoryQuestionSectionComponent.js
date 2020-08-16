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
    textAlign: 'center',
    color: COLOR.white,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.largeSize,
  },

  questionTitleContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 30,
  },
});

export default styles;