import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

// API
import {login} from './../api/postRequests/login';

// Redux
import {connect} from 'react-redux';
import {userLoginSuccessful} from './../redux/actions/userActions';

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import TextInputComponent from './../components/TextInputComponent';
import ButtonComponent from './../components/ButtonComponent';


// Styles
import styles from './../styles/screens/LoginScreen';
import { ICON_SIZE, COLOR } from '../styles/styleHelpers';

const LoginScreen = (props) => {  
  const [emailAddress, setEmailAddressValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Direct navigation to homepage. 
  const navigation = useNavigation();

  const onSubmit = async () => {
    setIsLoading(true);
    const data = await login(emailAddress, password);

    const storeAuthToken = async (encryptedToken) => {
      try {
        await AsyncStorage.setItem('A_LIFE_LIVED_TOKEN', encryptedToken);
      } catch (error) {
        console.log(error);
      }
    };
    
    if (data.status === 200) {
      try {
        const userData = data.data;
        storeAuthToken(userData.encryptedToken);
        props.userLoginSuccessful(userData);
        setIsLoading(false);
        return navigation.navigate('Home');
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      };
    } else {
      setIsLoading(false)
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
          isLoading={isLoading}
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

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccessful: (userData) => dispatch(userLoginSuccessful(userData))
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);