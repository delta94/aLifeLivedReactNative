import React, {useState} from 'react';
import {View} from 'react-native';


// Component
import LargeTextInput from './LargeTextInputComponent';

// Style
import styles from './../styles/components/CreateStoryComponent'

const CreateStoryComponent = () => {
  const [storyAbout, setStoryAbout] = useState("");
  const [storyDescription, setStoryDescription] = useState("");

  return (
    <View style={styles.mainContainer}>
        <LargeTextInput 
          label="Whose the story about?"
          placeholder="Can be your parents, friends, neighbour or even a stranger..."
          multiline={true}
          autoCapitalize="sentences"
          onChange={(event) => setStoryAbout(event)}
        />

        <LargeTextInput
          label="In one sentence what is the meaning of the story?"
          placeholder="Enter a brief description about the story..."
          multiline={true}
          onChange={(event) => setStoryDescription(event)}
        />
    </View>
  )
};

export default CreateStoryComponent;