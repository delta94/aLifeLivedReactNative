import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

// Components
import TextInputComponent from './../components/TextInputComponent';

// Styles
import styles from './../styles/screens/LoginScreen';

const LoginScreen = ({navigation}) => {
  
  const [emailAddressValue, setEmailAddressValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  
  const onChangeEmailAddress = ({text}) => {
    return setEmailAddressValue(text)
  };

  const onChangePassword = ({text}) => {
    return setPasswordValue(text)
  };

  return (
    <View style={styles.container}>
      <Text> HELLO </Text>
      <Text> Sign in to your account</Text>
      <TextInputComponent
        placeholder="Email address"
        onChange={(event) => {
          onChangeEmailAddress(event);
        }}
        keyboardType="email-address"
      />
      <TextInputComponent
        placeholder="Password"
        onChange={(event) => {
          onChangeEmailAddress(event);
        }}
        keyboardType="email-address"
      />
      <Button
        title="Don't have an account?"
        onPress={() => navigation.push('SignUp')}
      />
    </View>
  );
};

export default LoginScreen;