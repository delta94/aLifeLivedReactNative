import React from 'react';
import {View} from 'react-native';

// Component
import LargeTextInput from './LargeTextInputComponent';

// Style
import styles from './../styles/components/CreateStoryComponent'

const CreateStoryComponent = ({onChangeStoryAbout, onChangeStoryDescription}) => {
  return (
    <View style={styles.mainContainer}>
      <LargeTextInput
        label="Whose the story about?"
        placeholder="Can be your parents, friends, neighbour or even a stranger..."
        multiline={true}
        maxLength={100}
        autoCapitalize="sentences"
        onChange={(event) => onChangeStoryAbout(event)}
      />

      <LargeTextInput
        label="In one sentence what is the meaning of the story?"
        placeholder="Enter a brief description about the story..."
        multiline={true}
        maxLength={100}
        autoCapitalize="sentences"
        onChange={(event) => onChangeStoryDescription(event)}
      />
    </View>
  );
};

export default CreateStoryComponent;