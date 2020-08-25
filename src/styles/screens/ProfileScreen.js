import { StyleSheet } from 'react-native';
import { FLEX, COLOR, FONT_SIZE, BORDER_RADIUS, HEADER_MARGINS } from './../styleHelpers';

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
    marginLeft: 20,
    overflow: "hidden",
  },

  buttonItem: {
    margin: 10
  }
});

export default styles;