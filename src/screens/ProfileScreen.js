import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

// Redux Actions
import {removeUserToken} from './../redux/actions/userActions';

// Components
import ButtonComponent from './../components/ButtonComponent';


const ProfileScreen = (props) => {

  const onSignOut = async () => {
    try {   
      await AsyncStorage.removeItem("A_LIFE_LIVED_TOKEN"); 
      return props.removeUserToken();
    } catch (error) {
      return console.log(error);  
    }
  };

  return (
    <View>
      <Text> HELLO PROFILE!! </Text>
      <ButtonComponent 
        title="Signout"
        buttonType="clear"
        onButtonPress={() => onSignOut()}
      />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeUserToken: () => dispatch(removeUserToken())
  }
};

export default connect(null, mapDispatchToProps)(ProfileScreen);
