import React from 'react';
import {View, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

// Components
import TextInputComponent from './TextInputComponent';

// Styles
import styles from './../styles/components/CreateStoryInterviewType';

const CreateStoryInterviewType = ({ isSelfInterview, setIsSelfInterviewTrue, setIsSelfInterviewFalse, onIntervieweeNameChange, interviewee, onChangeIntervieweeValidation, validationErrorMessage}) => {



  return (
    <View>
      <TouchableOpacity style={isSelfInterview === false || isSelfInterview === null ? styles.touchableOpacityButton : styles.touchableOpacityButtonActive} onPress={setIsSelfInterviewTrue}>
        <Text style={isSelfInterview === false || isSelfInterview === null ? styles.buttonHeader : styles.buttonHeaderActive}>Myself</Text>
        <Text style={isSelfInterview === false || isSelfInterview === null ? styles.buttonSubText : styles.buttonSubTextActive}>This means no one else will be involved in the interview process.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={isSelfInterview === true || isSelfInterview === null ? styles.touchableOpacityButton : styles.touchableOpacityButtonActive} onPress={setIsSelfInterviewFalse}>
        <Text style={isSelfInterview === true || isSelfInterview === null ? styles.buttonHeader : styles.buttonHeaderActive}>Someone else</Text>
        <Text style={isSelfInterview === true || isSelfInterview === null ? styles.buttonSubText : styles.buttonSubTextActive}>Someone else will interviewing you or you will be interviewing someone.</Text>
      </TouchableOpacity>

      {isSelfInterview === false ? (
        <TextInputComponent
          label="Who will you be interviewing?"
          value={interviewee}
          placeholder="Enter in interviewers name"
          iconName="user"
          iconType="font-awesome"
          onChange={(event) => onIntervieweeNameChange(event)}
          inputValidation={(event) => !event ? onChangeIntervieweeValidation('This field is required') : onChangeIntervieweeValidation(null)}
          errorMessage={validationErrorMessage.intervieweeValidation}
        />
      ) : null}
    </View>
  )
};

export default CreateStoryInterviewType;