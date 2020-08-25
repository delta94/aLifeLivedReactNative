import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';

// Redux Actions
import { removeUserToken } from './../redux/actions/userActions';

// Helpers
import { removeToken } from './../helpers/asyncStorage';

// Components
import ButtonClearComponent from './../components/ButtonClearComponent';

// Styles
import styles from './../styles/screens/SettingsScreen';

const SettingsScreen = ({ removeUserToken, navigation: {setParams} }) => {
  
  const onSignOut = async () => {
    try {
      await removeToken();
      return removeUserToken();
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ButtonClearComponent
        title="FAQ"
      />

      <ButtonClearComponent
        title="Contact us"
      />

      <ButtonClearComponent
        title="Sign out"
        onButtonPress={() => onSignOut()}
      />
    </View>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeUserToken: () => dispatch(removeUserToken())
  }
};

export default connect(null, mapDispatchToProps)(SettingsScreen);