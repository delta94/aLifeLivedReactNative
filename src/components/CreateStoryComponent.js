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
        inputValidation={(event) => !event ? onChangeStoryAboutValidation('This field is required') : onChangeStoryAboutValidation(null)}
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
        inputValidation={(event) => !event ? onChangeStoryDescriptionValidation('This field is required') : onChangeStoryDescriptionValidation(null)}
        errorMessage={validationErrorMessage.storyDescriptionValidation}
      />
    </View>
  );
};

export default CreateStoryComponent;