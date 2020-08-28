import { StyleSheet } from 'react-native';
import {COLOR, FONT_SIZE, BORDER_RADIUS} from './../styleHelpers';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    flex: 1,
    borderTopEndRadius: BORDER_RADIUS.medium,
    borderTopLeftRadius: BORDER_RADIUS.medium,
  },

  buttonListDisplay: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    borderTopRightRadius: BORDER_RADIUS.medium,
    borderTopLeftRadius: BORDER_RADIUS.medium,
  },

  buttonItem: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
  },

  buttonFocused: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLOR.limeGreen,
  },

  buttonFocusedText: {
    color: COLOR.white,
    fontWeight: 'bold',

  },

  headerText: {
    color: COLOR.grey,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.mediumSize,
  },

  flatListContainer: {
    margin: 10,
    marginTop: 40,
  },

  storyCard: {
    marginBottom: 10,
  },
});

export default styles;