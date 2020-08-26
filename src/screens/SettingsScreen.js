import React from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';

// Redux Actions
import { returnUserReducerToDefaultState } from './../redux/actions/userActions';

// Helpers
import { removeToken } from './../helpers/asyncStorage';

// Components
import ButtonClearComponent from './../components/ButtonClearComponent';

// Styles
import styles from './../styles/screens/SettingsScreen';

const SettingsScreen = ({ returnUserReducerToDefaultState, navigation: {setParams} }) => {
  
  const onSignOut = async () => {
    try {
      returnUserReducerToDefaultState();
      return await removeToken();
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ButtonClearComponent
        title="FAQ"
        buttonType="clear"
      />

      <ButtonClearComponent
        title="Contact us"
        buttonType="clear"
      />

      <ButtonClearComponent
        title="Sign out"
        buttonType="clear"
        onButtonPress={() => onSignOut()}
      />
    </View>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    returnUserReducerToDefaultState: () => dispatch(returnUserReducerToDefaultState()),
  };
};

export default connect(null, mapDispatchToProps)(SettingsScreen);