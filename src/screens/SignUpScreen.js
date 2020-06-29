import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Components
import TextInputComponent from './../components/TextInputComponent';
import ButtonComponent from './../components/ButtonComponent';
import ButtonClearComponent from './../components/ButtonClearComponent';
import AvatarComponent from './../components/AvatarComponent';

const SignUpScreen = () => {

  // Direct navigation to homepage. 
  const navigation = useNavigation();

  // Input Values
  const [avatarURI, setAvatarURI] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View>
      <View></View>
      <View>
        <AvatarComponent
          isRounded={true}
          showEditButton={true}
          size="large"
          iconName="user"
        />
        
        <TextInputComponent
          placeholder="Email Address"
          keyboardType="email-address"
          iconName="envelope"
          iconType="font-awesome"
        />

        <TextInputComponent
          placeholder="Username"
          iconName="user"
          iconType="font-awesome"
        />

        <TextInputComponent
          placeholder="Mobile Number"
          iconName="mobile"
          iconType="font-awesome"
        />

        <TextInputComponent
          placeholder="Password"
          iconName="lock"
          iconType="font-awesome"
        />

        <TextInputComponent
          placeholder="Confirm Password"
          iconName="lock"
          iconType="font-awesome"
        />

        <ButtonComponent
          title="Signup"
          onButtonPress={() => console.log('HELLO THERE')}
        />

        <ButtonClearComponent
          title="Already have an account?"
          onButtonPress={() => navigation.push('Login')}
        />
      </View>
    </View>
  );
};

export default SignUpScreen;
