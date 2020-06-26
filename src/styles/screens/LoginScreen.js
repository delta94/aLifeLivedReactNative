import {StyleSheet} from 'react-native';
import {FLEX, COLOR, FONT_SIZE} from './../styleHelpers';

const styles = StyleSheet.create({
  container: {
    flex: FLEX.flexOne,
    backgroundColor: COLOR.white,
    display: "flex",
    justifyContent: "space-around",
    alignItems:'center'
  },

  textContainer: {
    alignItems: "center",
    marginBottom: 100
  },

  header: {
    fontWeight: "bold",
    fontSize: FONT_SIZE.xLargeSize,
    marginBottom: 20
  }
});

export default styles;
