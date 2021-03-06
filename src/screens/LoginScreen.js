import React, {useState} from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// Async Storage
import {storeToken} from './../helpers/asyncStorage';

// API
import { login } from './../api/postRequests/login';

// Redux
import {connect} from 'react-redux';
import { userLoginSuccessful, setUserStories, setUserToken } from './../redux/actions/userActions';

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';
// Icon
import IconComponent from './../components/IconComponent';

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
      const userData = response.data;
      const authToken = response.headers.authtoken;

      // Stores token in async 
      storeToken(authToken);

      // Sets user token in reducer
      setUserToken(authToken);

      // Saves userData to reducer 
      userLoginSuccessful(userData.userData);

      // Sets user stories to reducer
      setUserStories(userData.userStories);

      // Navigates to home
      navigation.navigate('tabsNavigator', {screen: 'Home'})
      return setIsLoading(false);
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
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('tabsNavigator', { screen: 'Home' })}>
          <IconComponent
            name="times"
            type="font-awesome-5"
            size={ICON_SIZE.iconSizeMedium}
            color={COLOR.grey}
          />
        </TouchableOpacity>
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
    setUserStories: (userStories) => dispatch(setUserStories(userStories)),
    setUserToken: (encryptedToken) => dispatch(setUserToken(encryptedToken))
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);