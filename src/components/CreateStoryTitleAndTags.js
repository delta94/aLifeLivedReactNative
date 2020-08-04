import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Components
import LargeTextInput from './LargeTextInputComponent';

// Styles
import styles from './../styles/components/CreateStoryTitleAndTags';

const CreateStoryTitleAndTags = ({onChangeStoryTitle, allTags, onSelectedTags, selectedTags}) => {
  // Displays the tags in a touchable opacity button
  const displayTags = () => {
    const tag = allTags.map((tag) => {

      const selectedTag = selectedTags.some((selectedTag) => {
        return selectedTag === tag.id;
      });


      return (
        <>
          <TouchableOpacity style={selectedTag ? styles.touchableOpacityButtonActive : styles.touchableOpacityButton} key={tag.id} onPress={() => selectedTag ? console.log("MAX") : onSelectedTags(tag.id)}>
            <Text style={selectedTag ? styles.buttonHeaderActive : styles.touchableOpacityText}>{tag.title}</Text>
          </TouchableOpacity>
        </>
      )
    });

    return tag;
  };

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
        {displayTags()}
      </View>
    </View>
  );
};

export default CreateStoryTitleAndTags;