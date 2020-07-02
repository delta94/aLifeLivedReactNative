import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native';

const HomeScreen = (props) => {
  return (
    <View>
      <Text> {props.userReducer.firstName ? props.userReducer.firstName : "HELLO"} </Text>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer
  };
};

export default connect(mapStateToProps)(HomeScreen);
