import React, {useState} from 'react';
import {View, Text, Keyboard, KeyboardAvoidingView} from 'react-native';
import {ScrollView } from "react-native-gesture-handler";

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

  // Below is input states
  const [storyAbout, setStoryAbout] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [isStoryPrivate, setIsStoryPrivate] = useState(null);

  const handleFormStage = (props) => {
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
            <Text style={styles.footerHeaderText}>Do you wish to make your stroy private or public</Text>
            <CreateStoryPrivacyComponent
              isStoryPrivate={isStoryPrivate}
              setStoryPrivate={() => setIsStoryPrivate(true)}
              setStoryPublic={() => setIsStoryPrivate(false)}
            />
          </View>
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
              onButtonPress={() => setStep(step + 1)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default StoryCreationScreen;
