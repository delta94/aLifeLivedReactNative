import React, {useState} from 'react';
import {View, Text, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import {ScrollView } from "react-native-gesture-handler";
import {connect} from 'react-redux';

// Helpers
import { useOrientation } from './../helpers/orientation';

// Actions
import { saveAllQuestions } from './../redux/actions/questionActions';
import { saveAllTags, resetStoryReducer, saveStoryDetails } from './../redux/actions/storyActions';

// API
import { getAllQuestions } from './../api/getRequests/getQuestions';
import { getAllTags } from './../api/getRequests/getTags';
import {createStory} from './../api/postRequests/createStory';

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import CreateStoryComponent from './../components/CreateStoryComponent';
import CreateStoryPrivacyComponent from './../components/CreateStoryPrivacyComponent';
import CreateStoryInterviewType from './../components/CreateStoryInterviewType';
import CreateStoryTitleAndTags from './../components/CreateStoryTitleAndTags';
import ButtonComponent from './../components/ButtonComponent';

// Styles
import styles from './../styles/screens/StoryCreationScreen';
import { ICON_SIZE, COLOR } from './../styles/styleHelpers';

const StoryCreationScreen = ({ route, navigation, saveAllQuestions, saveAllTags, storyReducer, userReducer, resetStoryReducer, saveStoryDetails}) => {  
  const orientation = useOrientation();
  
  // Below is all basic form things
  const [step, setStep] = useState(route.params.step);
  const [isLoading, setIsLoading] = useState(false);
  
  // Below is input states
  const [storyAbout, setStoryAbout] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [interviewee, setIntervieweeName] = useState("");
  const [storyTitle, setStoryTitle] = useState("");

  

  // Below are boolean states
  const [isStoryPrivate, setIsStoryPrivate] = useState(null);
  const [isSelfInterview, setIsSelfInterview] = useState(null);

  // Below are array states
  const [selectedTags, setSelectedTags] = useState([]);

  // Loads questions.
  const loadQuestions = async () => {
    setIsLoading(true);
    const response = await getAllQuestions();
    const responseTag = await getAllTags();

    if (response.status === 200) {
      try {
        saveAllQuestions(response.data);
        setIsLoading(true);
      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
    } else {
      setIsLoading(false);
      console.log(response.errorMessage);
    };

    // Gets all the tags to display on the last page.
    if (responseTag.status === 200) {
      try {
        saveAllTags(responseTag.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
    } else {
      setIsLoading(false);
      console.log(responseTag.errorMessage);
    };

    return setIsLoading(false);
  };

  // Handles when the user hits next
  const handleOnNextButton = async () => {
    if (step === 2) {
      await loadQuestions();
      navigation.navigate('Record Story');
      // Increase step because user returns here to create story at the end of recording questions. 
      setStep(step + 1);
      return setIsLoading(false);
    } else if (step >= 3) {
      const userID = userReducer.id;
      const responses = storyReducer.responses;
      const storyData = {
        about: storyAbout,
        description: storyDescription, 
        interviewee: interviewee,
        title: storyTitle,
        isPublic: isStoryPrivate,
        isSelfInterview: isSelfInterview,
        selectedTags: selectedTags,
        interviewer: userID,
        responses: responses
      };

      //TODO: Change the below object to just be storyData.
      saveStoryDetails({ storyAbout, storyDescription, interviewee, storyTitle, isStoryPrivate, isSelfInterview, selectedTags, userID});
      await createStory(storyData);
    } else {
      return setStep(step + 1)
    }
  };

  const handleOnClose = () => {
    resetStoryReducer();
    return navigation.reset({ routes: [{ name: 'Home' }] });
  };

  const handleFormStage = () => {
    switch (step) {
      case 0:
        return (
          <CreateStoryComponent
            onChangeStoryAbout={(event) => {setStoryAbout(event)}}
            onChangeStoryDescription={(event) => {setStoryDescription(event)}}
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
              onIntervieweeNameChange={(event) => setIntervieweeName(event)}
            />
          </View>
        )
      case 3:
        return (
          <View>
            <CreateStoryTitleAndTags 
              onChangeStoryTitle={(event) => setStoryTitle(event)}
              onSelectedTags={(id) => setSelectedTags(selectedTags.concat(id))}
              onRemoveSelectedTag={(id) => setSelectedTags(selectedTags.filter(tag => tag != id))}
              allTags={storyReducer.allTags}
              selectedTags={selectedTags}
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
          onPress={() => handleOnClose()}
        />
        <Text style={styles.headerText}>{step >= 3 ? "You're nearly done..." : "Create Your Story"}</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} style={styles.footer}>
        <View style={styles.footer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.contentContainer}>{handleFormStage()}</View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.buttonFooter}>
        <View style={styles.buttonContainer}>
          {step <= 0 || step >= 3 ? (
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
            title={step >= 3 ? "Finish" : "Next"}
            buttonSize="small"
            buttonType="solid"
            isLoading={isLoading}
            onButtonPress={handleOnNextButton}
          />
        </View>
      </View>
    </View>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    saveAllQuestions: (questions) => dispatch(saveAllQuestions(questions)),
    saveAllTags: (data) => dispatch(saveAllTags(data)),
    resetStoryReducer: () => dispatch(resetStoryReducer()),
    saveStoryDetails: (storyData) => dispatch(saveStoryDetails(storyData))
  }
};

function mapStateToProps (state) {
  return {
    storyReducer: state.storyReducer,
    userReducer: state.userReducer
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (StoryCreationScreen);
