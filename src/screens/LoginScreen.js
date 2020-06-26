import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

// Components
import TextInputComponent from './../components/TextInputComponent';
import ButtonComponent from './../components/ButtonComponent';

// Styles
import styles from './../styles/screens/LoginScreen';
import {COLOR, ICON_SIZE} from './../styles/styleHelpers';

const LoginScreen = ({navigation}) => {
  
  const [emailAddressValue, setEmailAddressValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.header}> HELLO </Text>
          <Text> Sign in to your account</Text>
        </View>

        <TextInputComponent
          placeholder="Email Address"
          keyboardType="email-address"
          iconName="user"
          iconType="font-awesome"
          onChange={(event) => setEmailAddressValue(event)}
        />

        <TextInputComponent
          placeholder="Password"
          iconName="lock"
          iconType="font-awesome"
          onChange={(event) => setPasswordValue(event)}
        />
      </View>

      <View>
        <ButtonComponent title="Login" buttonType="solid" />
        <Button
          title="Don't have an account?"
          onPress={() => navigation.push('SignUp')}
        />
      </View>
    </View>
  );
};

export default LoginScreen;