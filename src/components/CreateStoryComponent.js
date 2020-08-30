import React from 'react';
import {View} from 'react-native';

// Component
import LargeTextInput from './LargeTextInputComponent';

// Style
import styles from './../styles/components/CreateStoryComponent'

const CreateStoryComponent = ({
  storyAbout,
  storyDescription,
  onChangeStoryAbout,
  onChangeStoryDescription,
  validationErrorMessage,
  onChangeStoryAboutValidation,
  onChangeStoryDescriptionValidation,
}) => {

  const validateStoryAbout = (event) => {
    if (!event) {
      return onChangeStoryAboutValidation('This field is required');
    } else {
      return onChangeStoryAboutValidation(null);
    }
  };

  const validateStoryDescription = (event) => {
    if (!event) {
      return onChangeStoryDescriptionValidation('This field is required');
    } else {
      return onChangeStoryDescriptionValidation(null);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <LargeTextInput
        label="Whose the story about?"
        placeholder="Can be your parents, friends, neighbour or even a stranger..."
        multiline={true}
        maxLength={100}
        value={storyAbout}
        autoCapitalize="sentences"
        onChange={(event) => onChangeStoryAbout(event)}
        inputValidation={(event) => validateStoryAbout(event)}
        errorMessage={validationErrorMessage.storyAboutValidation}
      />

      <LargeTextInput
        value={storyDescription}
        label="In one sentence what is the meaning of the story?"
        placeholder="Enter a brief description about the story..."
        multiline={true}
        maxLength={100}
        autoCapitalize="sentences"
        onChange={(event) => onChangeStoryDescription(event)}
        inputValidation={(event) => validateStoryDescription(event)}
        errorMessage={validationErrorMessage.storyDescriptionValidation}
      />
    </View>
  );
};

export default CreateStoryComponent;