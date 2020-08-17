import { StyleSheet } from 'react-native';
import { COLOR, FONT_SIZE } from '../styleHelpers';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingBottom: 15,
  },

  imageAndTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  contentContainer: {
    marginLeft: 10
  },

  header: {
    fontWeight: 'bold',
    fontSize: FONT_SIZE.mediumSize,
    color: COLOR.grey,
  },

  likesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  likes: {
    marginLeft: 10,
    color: COLOR.grey
  },

  bookMarkContainer: {
    justifyContent: "flex-end",
  }
});

export default styles;
