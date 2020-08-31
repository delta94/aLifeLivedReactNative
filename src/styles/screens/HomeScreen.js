import { StyleSheet } from 'react-native';
import { COLOR, BORDER_RADIUS, FONT_SIZE } from '../styleHelpers';

const styles = StyleSheet.create({

  container: {
    backgroundColor: COLOR.white,
    flex: 1,
    borderTopEndRadius: BORDER_RADIUS.medium,
    borderTopLeftRadius: BORDER_RADIUS.medium,
  },

  storyCard: {
    zIndex: 1,
    paddingBottom: 20
  },

  contentContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',

  },

  headerText: {
    fontWeight: 'bold',
    fontSize: FONT_SIZE.largeSize,
    color: COLOR.grey,
    marginBottom: 30,
    marginTop: 10
  }
});

export default styles;