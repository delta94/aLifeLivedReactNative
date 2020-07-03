import React, {useState} from 'react';
import {View, Text, Keyboard, KeyboardAvoidingView, Button} from 'react-native';
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import CreateStoryComponent from './../components/CreateStoryComponent';
import CreateStoryPrivacyComponent from './../components/CreateStoryPrivacyComponent';
import ButtonComponent from './../components/ButtonComponent';

// Styles
import styles from './../styles/screens/StoryCreationScreen';
import { ICON_SIZE, COLOR } from './../styles/styleHelpers';

const StoryCreationScreen = ({navigation}) => {

  // Below is all basic form things
  const [step, setStep] = useState(0);

  console.log(step);
  
  // Below is input states
  const [storyAbout, setStoryAbout] = useState("");
  const [storyDescription, setStoryDescription] = useState("");

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
          <CreateStoryPrivacyComponent 

          />
        )
      default:
        break;
    }
  };

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
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <View style={styles.footer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.contentContainer}>
              {handleFormStage()}
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonFooter}>
          <View style={styles.buttonContainer}>
            <ButtonComponent
              title="Back"
              buttonSize="small"
              buttonType="solid"
              onButtonPress={() => setStep(step - 1)}
            />
            <ButtonComponent
              title="Next"
              buttonSize="small"
              buttonType="solid"
              onButtonPress={() => setStep(step + 1)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default StoryCreationScreen;
