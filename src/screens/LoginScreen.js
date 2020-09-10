import React, {useState} from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// Async Storage
import {storeToken} from './../helpers/asyncStorage';

// API
import { login } from './../api/postRequests/login';

// Redux
import {connect} from 'react-redux';
import { userLoginSuccessful, setUserStories } from './../redux/actions/userActions';

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import TextInputComponent from './../components/TextInputComponent';
import ButtonComponent from './../components/ButtonComponent';
import ButtonClearComponent from './../components/ButtonClearComponent';

// Styles
import styles from './../styles/screens/LoginScreen';
import { ICON_SIZE, COLOR } from '../styles/styleHelpers';

const LoginScreen = ({ userLoginSuccessful, navigation, setUserStories }) => {  
  const [emailAddress, setEmailAddressValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    const response = await login(emailAddress, password);

    if (response.status === 200) {
      try {
        const userData = response.data;
        const authToken = response.headers.authtoken;
        storeToken(authToken);
        userLoginSuccessful(userData.userData, authToken);
        setUserStories(userData.userStories);
        navigation.navigate('tabsNavigator', {screen: 'Home'})
        return setIsLoading(false);
      } catch (error) {
        console.log(error);
        return setIsLoading(false);
      };
    } else {
      setIsLoading(false)
      console.log(response.errorMessage);
      setErrorMessage(response.errorMessage);
    }
  };
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>A Life Lived</Text>
      </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <AntDesign
            name="close"
            size={ICON_SIZE.iconSizeMedium}
            color={COLOR.grey}
            style={styles.icon}
            onPress={() => navigation.navigate('tabsNavigator', {screen: 'Home'})}
          />
        <ScrollView>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.textInputContainer}>       
              <View style={styles.textContainer}>
                <Text style={styles.header}>HELLO</Text>
                <Text>Sign in to your account</Text>
              </View>
            
              <TextInputComponent
                autoCapitalize="none"
                placeholder="Email Address"
                keyboardType="email-address"
                iconName="user"
                iconType="font-awesome"
                onChange={(event) => setEmailAddressValue(event)}
              />

              <TextInputComponent
                autoCapitalize="none"
                placeholder="Password"
                iconName="lock"
                iconType="font-awesome"
                secureTextEntry={true}
                onChange={(event) => setPasswordValue(event)}
              />  
            </View>
          </KeyboardAvoidingView>
          <View style={styles.buttonContainer}>
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <ButtonComponent
              title="Login"
              buttonType="solid"
              isLoading={isLoading}
              onButtonPress={() => onSubmit()}
              disabled={emailAddress || password ? false : true}
            />

            <ButtonClearComponent
              title="Don't have an account?"
              buttonType="clear"
              onButtonPress={() => navigation.push('SignUp')}
            />
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccessful: (userData, authToken) => dispatch(userLoginSuccessful(userData, authToken)),
    setUserStories: (userStories) => dispatch(setUserStories(userStories))
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);