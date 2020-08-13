import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native';

// API
import {getAllPublicStories} from './../api/getRequests/getStory';

const HomeScreen = (props) => {

  const onLoad = async () => {
    const allStories = await getAllPublicStories();
    console.log(allStories.data);
  };

  useEffect(() => {
    onLoad();
  }, []);


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
