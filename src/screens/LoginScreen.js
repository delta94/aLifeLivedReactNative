import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import TextInputComponent from './../components/TextInputComponent';
import ButtonComponent from './../components/ButtonComponent';

// API
import {login} from './../api/postRequests/login';

// Styles
import styles from './../styles/screens/LoginScreen';
import { ICON_SIZE, COLOR } from '../styles/styleHelpers';

const LoginScreen = () => {  
  const [emailAddress, setEmailAddressValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Direct navigation to homepage. 
  const navigation = useNavigation();

  const onSubmit = async () => {
    const data = await login(emailAddress, password);
    
    if (data.status === 200) {
      const userData = data.data;
      console.log(userData);
      
    } else {
      console.log(data.errorMessage);
      setErrorMessage(data.errorMessage);
    }
  };
  
  return (
    <View style={styles.container}>
      <AntDesign name="close" size={ICON_SIZE.iconSizeMedium} color={COLOR.grey} style={styles.icon} onPress={() => navigation.navigate("Home")}/>
      <View style={styles.texInputContainer}>
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
          secureTextEntry={true}
          onChange={(event) => setPasswordValue(event)}
        />
      </View>

      <View style={styles.buttonContainer}>
        {errorMessage ? (
          <Text style={styles.errorMessage}> {errorMessage} </Text>
        ) : null}
        <ButtonComponent
          title="Login"
          buttonType="solid"
          onButtonPress={() => onSubmit()}
          disabled={emailAddress || password ? false : true}
        />

        <Button
          title="Don't have an account?"
          onPress={() => navigation.push('SignUp')}
        />
      </View>
    </View>
  );
};

export default LoginScreen;