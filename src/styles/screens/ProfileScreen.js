import { StyleSheet } from 'react-native';
import {COLOR, FONT_SIZE, BORDER_RADIUS} from './../styleHelpers';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    flex: 1,
    borderTopLeftRadius: 100,
  },

  buttonListDisplay: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    borderTopLeftRadius: 100,
    marginLeft: 30,
    overflow: "hidden",
  },

  buttonItem: {
    margin: 10
  },

  flatListContainer: {
    margin: 10,
    marginTop: 40
  },

  storyCard: {
    marginBottom: 10
  }
});

export default styles;