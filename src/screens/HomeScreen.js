import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native';

const HomeScreen = (props) => {
  return (
    <View>
      <Text> {props.userReducer.firstName ? props.userReducer.firstName : "HELLO"} </Text>
      <Image 
        style={{width: 100, height: 100}}
        source={{uri: props.userReducer.avatarURL}}
      />
    </View>
  );
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer
  };
};

export default connect(mapStateToProps)(HomeScreen);
