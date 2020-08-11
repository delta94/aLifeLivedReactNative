import { StyleSheet } from 'react-native';
import { COLOR, BORDER_RADIUS, FONT_SIZE } from './../styleHelpers';

const styles = StyleSheet.create({
  mainContainer: {
  },

  headerContainer: {
    display: "flex",
    flexDirection: 'row',
    alignContent: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
    marginLeft: 10
  },

  headerTextContainer: {
    marginLeft: 5,
  },
  
  headerText: {
    fontWeight: "bold"
  }
});

export default styles;