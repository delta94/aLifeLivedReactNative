import React from 'react';
import {View, Text, Button} from 'react-native';

const LoginScreen = ({navigation}) => {
  return (
    <View>
      <Text> HELLO WORLD!! </Text>
      <Button
        title="SignUp"
        onPress={() => navigation.push('SignUp')}
      />
    </View>
  );
};

export default LoginScreen;