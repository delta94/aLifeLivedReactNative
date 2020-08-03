import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Components
import LargeTextInput from './LargeTextInputComponent';

// Styles
import styles from './../styles/components/CreateStoryTitleAndTags';

const CreateStoryTitleAndTags = ({onChangeStoryTitle}) => {
  return (
    <View>
      <LargeTextInput
        label="What do you want the title of this story to be?"
        placeholder="The time my parents first met, the greatest race, my interview with grandpa"
        multiline={true}
        maxLength={100}
        autoCapitalize="sentences"
        onChange={(event) => onChangeStoryTitle(event)}
      />

      <Text style={styles.footerHeaderText}>Select some tags that best describe this story</Text>
      <View style={styles.tagContainer}>
        <TouchableOpacity style={styles.touchableOpacityButton}>
          <Text style={styles.touchableOpacityText}>Warrrrrrrrrrr</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacityButton}>
          <Text style={styles.touchableOpacityText}>Warrrrrrrrrrrrrrrrrrrr</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacityButton}>
          <Text style={styles.touchableOpacityText}>Warrrrrrrrrrrrrrrrrrrr</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default CreateStoryTitleAndTags;