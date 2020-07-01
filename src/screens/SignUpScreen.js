import React, {useState} from 'react';
import ImagePicker from 'react-native-image-picker';
import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// API
import {signUp} from './../api/postRequests/signUp';

// Redux
import {connect} from 'react-redux';
import {userLoginSuccessful} from './../redux/actions/userActions';

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import TextInputComponent from './../components/TextInputComponent';
import ButtonComponent from './../components/ButtonComponent';
import ButtonClearComponent from './../components/ButtonClearComponent';
import AvatarComponent from './../components/AvatarComponent';

// Styles
import styles from './../styles/screens/SignUpScreen';
import { ICON_SIZE, COLOR } from '../styles/styleHelpers';

const SignUpScreen = () => {

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Direct navigation to homepage. 
  const navigation = useNavigation();

  // Input Values
  const [avatarURI, setAvatarURI] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation
  const [firstNameValidation, setFirstNameValidation] = useState(null);
  const [lastNameValidation, setLastNameValidation] = useState(null);
  const [emailAddressValidation, setEmailAddressValidation] = useState(null);
  const [usernameValidation, setUsernameValidation] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async () => {
    setIsLoading(true);
    const userData = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      username: username, 
      mobileNumber: mobileNumber,
      password: password
    };

    const data = await signUp(userData);
    
    if (data.status === 200) {
      try {
        const userData = data.data
      } catch (error) {
        console.log("HERE", error);
        
      }
    } else {
      console.log(data.errorMessage)
      setErrorMessage(data.errorMessage);
    }
 
  };

  // Below uses image picker to select image
  const imagePicker = () => {
    const options = {
      noData: true,
    };

    ImagePicker.launchImageLibrary(options, (response) => {      
      setAvatarURI(response.uri)
    });
  };

  // Validation
  const validateFirstName = (event) => {
    if (!event) {
      return setFirstNameValidation('First name is required');
    } else {
      return setFirstNameValidation(null);
    }
  };

  const validateLastName = (event) => {
    if (!event) {
      return setLastNameValidation('Last name is required');
    } else {
      return setLastNameValidation(null);
    }
  };

  const validateEmailAddress = (event) => {
    if (!event) {
      return setEmailAddressValidation('Email address is required');
    } else if (!event) {

    } else {
      return setEmailAddressValidation(null);
    }
  };

  const validateUsername = (event) => {
    if (!event) {
      return setUsernameValidation('Username is required');
    } else if (event.length < 3) {
      return setUsernameValidation('Username must be 3 characters or greater');
    } else {
      return setUsernameValidation(null);
    }
  };

  const validatePassword = (event) => {
    if (!event) {
      return setPasswordValidation('Password is required');
    } else if (event.length < 6) {
      return setPasswordValidation('Password must be 6 characters or greater');
    } else {
      return setPasswordValidation(null);
    }
  };

  const validateConfirmPassword = (event) => {
    if (!event) {
      return setConfirmPasswordValidation('Please enter the above password again');
    } else if (event != password) {
      return setConfirmPasswordValidation("Passwords don't match");
    } else {
      return setConfirmPasswordValidation(null);
    }
  };

  const disableButton = () => {
    if (!firstName || !lastName || !emailAddress || !username || !password || !confirmPassword) {
      return true;
    } else if (firstNameValidation || lastNameValidation || emailAddressValidation || usernameValidation || passwordValidation || confirmPasswordValidation) {
      return true
    } else {
      return false;
    }
  };

  console.log(disableButton());
  

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}> A Life Lived </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <ScrollView>
              <View style={styles.iconContainer}>
                <View style={styles.crossIcon}>
                  <AntDesign
                    name="close"
                    size={ICON_SIZE.iconSizeMedium}
                    color={COLOR.grey}
                    style={styles.icon}
                    onPress={() => navigation.navigate('Home')}
                  />
                </View>
                <View style={styles.avatarContainer}>
                  <AvatarComponent
                    style={styles.avatarIcon}
                    isRounded={true}
                    showEditButton={true}
                    size="xlarge"
                    iconName="user"
                    source={avatarURI}
                    onPress={() => imagePicker()}
                  />
                </View>
              </View>

              <View style={styles.textInputContainer}>
                <TextInputComponent
                  placeholder="First name"
                  iconName="address-card"
                  iconType="font-awesome"
                  errorMessage={
                    !firstName ? 'First name must not be empty' : null
                  }
                  isFocused={true}
                  onChange={(event) => setFirstName(event)}
                  inputValidation={(event) => validateFirstName(event)}
                  errorMessage={firstNameValidation}
                />

                <TextInputComponent
                  placeholder="Last name"
                  iconName="address-card"
                  iconType="font-awesome"
                  onChange={(event) => setLastName(event)}
                  inputValidation={(event) => validateLastName(event)}
                  errorMessage={lastNameValidation}
                />

                <TextInputComponent
                  autoCapitalize="none"
                  placeholder="Email Address"
                  keyboardType="email-address"
                  iconName="envelope"
                  iconType="font-awesome"
                  onChange={(event) => setEmailAddress(event)}
                  inputValidation={(event) => validateEmailAddress(event)}
                  errorMessage={emailAddressValidation}
                />

                <TextInputComponent
                  placeholder="Username"
                  iconName="user"
                  iconType="font-awesome"
                  onChange={(event) => setUsername(event)}
                  inputValidation={(event) => validateUsername(event)}
                  errorMessage={usernameValidation}
                />

                <TextInputComponent
                  placeholder="Mobile Number"
                  keyboardType="phone-pad"
                  iconName="mobile"
                  iconType="font-awesome"
                  onChange={(event) => setMobileNumber(event)}
                />

                <TextInputComponent
                  placeholder="Password"
                  secureTextEntry={true}
                  iconName="lock"
                  iconType="font-awesome"
                  onChange={(event) => setPassword(event)}
                  inputValidation={(event) => validatePassword(event)}
                  errorMessage={passwordValidation}
                />

                <TextInputComponent
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  iconName="lock"
                  iconType="font-awesome"
                  onChange={(event) => setConfirmPassword(event)}
                  inputValidation={(event) => validateConfirmPassword(event)}
                  errorMessage={confirmPasswordValidation}
                />
              </View>

              <View style={styles.buttonContainer}>
                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                <ButtonComponent
                  title="Signup"
                  onButtonPress={() => onSubmit()}
                  disabled={disableButton()}
                />

                <ButtonClearComponent
                  title="Already have an account?"
                  onButtonPress={() => navigation.push('Login')}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
      </Animatable.View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccessful: (userData) => dispatch(userLoginSuccessful(userData)),
  };
};


export default connect(null, mapDispatchToProps)(SignUpScreen);
