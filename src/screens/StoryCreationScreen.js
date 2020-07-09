import React, {useState} from 'react';
import {View, Text, Keyboard, KeyboardAvoidingView} from 'react-native';
import {ScrollView } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import CreateStoryComponent from './../components/CreateStoryComponent';
import CreateStoryPrivacyComponent from './../components/CreateStoryPrivacyComponent';
import CreateStoryInterviewType from './../components/CreateStoryInterviewType';
import ButtonComponent from './../components/ButtonComponent';

// Styles
import styles from './../styles/screens/StoryCreationScreen';
import { ICON_SIZE, COLOR } from './../styles/styleHelpers';

const StoryCreationScreen = ({navigation}) => {  
  // Below is all basic form things
  const [step, setStep] = useState(0);
  

  // Below is input states
  const [storyAbout, setStoryAbout] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [intervieweeName, setIntervieweeName] = useState("");

  // Below are boolean states
  const [isStoryPrivate, setIsStoryPrivate] = useState(null);
  const [isSelfInterview, setIsSelfInterview] = useState(null);

  const handleOnNextButton = () => {
    if (step >= 2) {
      return navigation.navigate('Record Story');
    } else {
      return setStep(step + 1)
    }
  }

  const handleFormStage = () => {
    switch (step) {
      case 0:
        return (
          <CreateStoryComponent
            onChangeStoryAbout={(event) => { setStoryAbout(event) }}
            onChangeStoryDescription={(event) => { setStoryDescription(event) }}
          />
        )
      case 1: 
        return (
          <View>
            <Text style={styles.footerHeaderText}>Do you wish to make your story private or public?</Text>
            <CreateStoryPrivacyComponent
              isStoryPrivate={isStoryPrivate}
              setStoryPrivate={() => setIsStoryPrivate(true)}
              setStoryPublic={() => setIsStoryPrivate(false)}
            />
          </View>
        )
      case 2: 
          return (
            <View>
              <Text style={styles.footerHeaderText}>Will you be interviewing yourself or someone else?</Text>
              <CreateStoryInterviewType
                isSelfInterview={isSelfInterview}
                setIsSelfInterviewTrue={() => setIsSelfInterview(true)}
                setIsSelfInterviewFalse={() => setIsSelfInterview(false)}
                onIntervieweeNameChange={(event) => console.log(event)}
              />
            </View>
          )
      default:
        break;
    }
  };
  console.log(step)

  return (
    <View style={styles.mainContainer} onPress={Keyboard.dismiss}>
      <View style={styles.headerContainer}>
        <AntDesign
          name="close"
          size={ICON_SIZE.iconSizeMedium}
          color={COLOR.grey}
          style={styles.icon}
          onPress={() => navigation.navigate('Home')}
        />
        <Text style={styles.headerText}> Create Your Story</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.footer}>
        <View style={styles.footer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.contentContainer}>{handleFormStage()}</View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.buttonFooter}>
        <View style={styles.buttonContainer}>
          {step <= 0 ? (
            <View></View>
          ) : (
            <ButtonComponent
              title="Back"
              buttonSize="small"
              buttonType="solid"
              onButtonPress={() => setStep(step - 1)}
            />
          )}

          <ButtonComponent
            title="Next"
            buttonSize="small"
            buttonType="solid"
            onButtonPress={handleOnNextButton}
          />
        </View>
      </View>
    </View>
  );
};

export default StoryCreationScreen;
