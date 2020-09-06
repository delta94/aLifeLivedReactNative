import React, {useState} from 'react';
import ImagePicker from 'react-native-image-picker';
import {View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

// API
import {signUp} from './../api/postRequests/signUp';
import {imageUpload} from './../api/postRequests/imageUpload';

// Redux
import {connect} from 'react-redux';
import {userLoginSuccessful} from './../redux/actions/userActions';

// Async Storage
import {storeToken} from './../helpers/asyncStorage';

// Icon
import IconComponent from './../components/IconComponent';

// Components
import TextInputComponent from './../components/TextInputComponent';
import ButtonComponent from './../components/ButtonComponent';
import ButtonClearComponent from './../components/ButtonClearComponent';
import AvatarComponent from './../components/AvatarComponent';

// Styles
import styles from './../styles/screens/SignUpScreen';
import { ICON_SIZE, COLOR } from '../styles/styleHelpers';

const SignUpScreen = (props) => {

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Input Values
  const [imageObject, setImageObject] = useState(null);
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
    let formData = new FormData();
    formData.append('file', imageObject);

    const imageResponseData = await imageUpload(formData);
    const avatarURL = imageResponseData.data;
    const userData = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      username: username, 
      mobileNumber: mobileNumber,
      password: password,
      avatarURL: avatarURL 
    };

    const response = await signUp(userData);
    
    if (response.status === 200) {
      try {
        const userData = response.data;
        const authToken = response.headers.authtoken;
        storeToken(authToken);
        props.userLoginSuccessful(userData, authToken);
        props.navigation.navigate('tabsNavigator', { screen: 'Home' })
        return setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      console.log(response.errorMessage)
      setErrorMessage(response.errorMessage);
    }
  };

  // Below uses image picker to select image
  const imagePicker =  () => {
  
    const options = {
      noData: true,
      maxWidth: 300,
      maxHeight: 300
    };

    ImagePicker.launchImageLibrary(options, async (photo) => {  
      if (photo.didCancel) {
        return;
      } else if (photo.error) {
        console.log("Image Picker error:", photo.error); 
      };

      let photoSuffix = photo.uri.split('.').pop();
      if (photoSuffix === 'jpg') {
        photoSuffix = 'jpeg'
      };

      const file = {
        type: `image/${photoSuffix}`,
        name: `photo.${photoSuffix}`,
        uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
      };
       
      setImageObject(file)
      setAvatarURI(photo.uri)
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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}> A Life Lived </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <ScrollView>
              <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.icon} onPress={() => props.navigation.navigate('tabsNavigator', { screen: 'Home' })}>
                  <IconComponent
                    name="times"
                    type="font-awesome-5"
                    size={ICON_SIZE.iconSizeMedium}
                    color={COLOR.grey}
                  />
                </TouchableOpacity>
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
                  isLoading={isLoading}
                />

                <ButtonClearComponent
                  title="Already have an account?"
                  buttonType="clear"
                  onButtonPress={() => props.navigation.push('Login')}
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
    userLoginSuccessful: (userData, authToken) => dispatch(userLoginSuccessful(userData, authToken)),
  };
};


export default connect(null, mapDispatchToProps)(SignUpScreen);
