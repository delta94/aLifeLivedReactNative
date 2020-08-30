import React, {useState, useLayoutEffect} from 'react';
import {View, Text, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import {ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {connect} from 'react-redux';

// Helpers
import { useOrientation } from './../helpers/orientation';

// Actions
import { saveAllQuestions, setSubQuestionActiveFalse } from './../redux/actions/questionActions';
import { saveAllTags, resetStoryReducer, saveStoryDetails } from './../redux/actions/storyActions';
import { saveNewStory } from './../redux/actions/allCollections';

// API
import { getAllQuestions } from './../api/getRequests/getQuestions';
import { getAllTags } from './../api/getRequests/getTags';
import {createStory} from './../api/postRequests/createStory';

import {finaliseStoryStreams, terminateChannels} from './../api/postRequests/audioStream';

// Icon
import IconComponent from './../components/IconComponent';

// Components
import CreateStoryComponent from './../components/CreateStoryComponent';
import CreateStoryPrivacyComponent from './../components/CreateStoryPrivacyComponent';
import CreateStoryInterviewType from './../components/CreateStoryInterviewType';
import CreateStoryTitleAndTags from './../components/CreateStoryTitleAndTags';
import ButtonComponent from './../components/ButtonComponent';

// Styles
import styles from './../styles/screens/StoryCreationScreen';
import { ICON_SIZE, COLOR } from './../styles/styleHelpers';

const StoryCreationScreen = ({ route, navigation, saveAllQuestions, saveAllTags, storyReducer, userReducer, questionReducer, resetStoryReducer, saveStoryDetails, saveNewStory}) => {  
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
  const [isStoryPublic, setIsStoryPublic] = useState(null);
  const [isSelfInterview, setIsSelfInterview] = useState(null);

  // Below are array states
  const [selectedTags, setSelectedTags] = useState([]);

  const [questions, setQuestions] = useState(questionReducer.questions);

  // Sets header option instead of having it in the screen..The other options set in headerOptions
  useLayoutEffect(() => {
    navigation.setOptions({
      title: step >= 4 ? 'Nearly done' : 'Create your story',
      headerLeft: () => (
        <TouchableOpacity onPress={() => handleOnClose()}>
          <IconComponent
            name="times"
            type="font-awesome-5"
            size={ICON_SIZE.iconSizeMedium}
            style={{ marginLeft: 20 }}
            color={COLOR.grey}
          />
        </TouchableOpacity>
      )
    })
  }, [])

  // Loads questions.
  const loadQuestions = async () => {
    setIsLoading(true);
    const response = await getAllQuestions();
    const responseTag = await getAllTags();

    if (response.status === 200) {
      try {
        saveAllQuestions(response.data);
        setQuestions(response.data);
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
      setIsLoading(false);
      return setStep(step + 1);
    } else if (step >= 3) {
      setIsLoading(true);
      // Gets data to send to server
      const userID = userReducer.id;
      //const responses = storyReducer.responses;
      let storyData = {
        about: storyAbout,
        description: storyDescription,
        interviewee: interviewee,
        title: storyTitle ? storyTitle : "left blank",
        isPublic: isStoryPublic,
        isSelfInterview: isSelfInterview,
        selectedTags: selectedTags,
        interviewer: userID,
      };

      // Saves story data to redux 
      saveStoryDetails(storyData);
      const storyID = await createStory(storyData);

      // unpack audio response and call finaliseStoryStreams
      const storySegments = collocateStorySegments();
      if (storySegments.length > 0) {
        storyData = await finaliseStoryStreams(storySegments, storyID);
        console.log('got updated story object ', storyData);
      }

      // save to the all collections reducer
      saveNewStory(storyData);

      // Navigates to the story - Need to pass stack name first then screen. Due to View story being in sep stack.
      navigation.navigate('screensNavigator', {
        screen: 'storyStack',
        params: {
          screen: 'View Story',
          params: {storyID}
        },
      });

      resetStoryReducer();
      return setIsLoading(false);
    } else {
      return setStep(step + 1)
    }
  };

  // steps through the questions objects
  // create a reference object identifying
  // the sequence of audio that needs to be
  // compiled (by the audio server) for the
  // finalised story post
  const collocateStorySegments = () => {
    const audioSegments = [];
    let question, subquestion;
    for (question of questions) {
      if (question.response === 'AUDIO') {
        audioSegments.push(questionToAudioSegment(question));
      }
      for (subquestion of question.subQuestions) {
        if (subquestion.response === 'AUDIO') {
          audioSegments.push(questionToAudioSegment(subquestion));
        }
      }
    }

    return audioSegments;
  }

  const questionToAudioSegment = ( quest ) => {
    return {
      questionAudioFile: quest.audioFile,
      answerAudioChannel: quest.channelId
    }
  }

  const handleOnClose = () => {
    resetStoryReducer();
    terminateChannels(questions);
    // Resets the stack screen location so you don't appear in that screen when you return to stack
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
              isStoryPrivate={isStoryPublic}
              setStoryPrivate={() => setIsStoryPublic(false)}
              setStoryPublic={() => setIsStoryPublic(true)}
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.footer}>
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
            title={step >= 3 ? 'Finish' : 'Next'}
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
    saveStoryDetails: (storyData) => dispatch(saveStoryDetails(storyData)),
    saveNewStory: (storyData) => dispatch(saveNewStory(storyData))
  }
};

function mapStateToProps (state) {
  return {
    storyReducer: state.storyReducer,
    userReducer: state.userReducer,
    questionReducer: state.questionReducer
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (StoryCreationScreen);
