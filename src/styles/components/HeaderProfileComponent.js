import { StyleSheet } from 'react-native';
import { COLOR, FONT_SIZE } from '../styleHelpers';

const styles = StyleSheet.create({

  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center'
  },


  avatarAndTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10
  },

  textContainer: {
    margin: 10,
    display: "flex",
    flexDirection: "column"
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row"
  },
  
  button: {
    margin: 10
  },
});

export default styles;
