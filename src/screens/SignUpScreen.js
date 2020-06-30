import React, {useState} from 'react';
import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// API
import {signUp} from './../api/postRequests/signUp';

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
  const [mobileNumber, setMobileNumber] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async () => {
    setIsLoading(true);
    const data = await signUp(emailAddress, firstName, lastName, username, mobileNumber, password);

    console.log(data);
    
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}> A Life Lived </Text>
      </View>
      <View style={styles.footer}>
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
              size="large"
              iconName="user"
            />
          </View>
        </View>
        
        <View style={styles.textInputContainer}> 
          <TextInputComponent
            placeholder="First name"
            iconName="user"
            iconType="font-awesome"
            onChange={(event) => setFirstName(event)}
          />

          <TextInputComponent
            placeholder="Last name"
            iconName="user"
            iconType="font-awesome"
            onChange={(event) => setLastName(event)}
          />

          <TextInputComponent
            placeholder="Email Address"
            keyboardType="email-address"
            iconName="envelope"
            iconType="font-awesome"
            onChange={(event) => setEmailAddress(event)}
          />

          <TextInputComponent
            placeholder="Username"
            iconName="user"
            iconType="font-awesome"
            onChange={(event) => setUsername(event)}
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
          />

          <TextInputComponent
            placeholder="Confirm Password"
            secureTextEntry={true}
            iconName="lock"
            iconType="font-awesome"
            onChange={(event) => setConfirmPassword(event)}
          />
        </View>
        

        <View style={styles.buttonContainer}>
          <ButtonComponent
            title="Signup"
            onButtonPress={() => console.log('HELLO THERE')}
          />

          <ButtonClearComponent
            title="Already have an account?"
            onButtonPress={() => navigation.push('Login')}
          />
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default SignUpScreen;
