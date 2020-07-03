import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Components

// Styles
import styles from './../styles/components/CreateStoryPrivacyComponent';

const CreateStoryComponent = ({setStoryPrivate, setStoryPublic, isStoryPrivate}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={isStoryPrivate ? styles.touchableOpacityButton : styles.touchableOpacityButtonActive } onPress={setStoryPublic}>
        <Text style={isStoryPrivate ? styles.buttonHeader : styles.buttonHeaderActive}>Public</Text>
        <Text style={isStoryPrivate ? styles.buttonSubText : styles.buttonSubTextActive}>By making your story public other users can listen and share it.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={isStoryPrivate ? styles.touchableOpacityButtonActive : styles.touchableOpacityButton} onPress={setStoryPrivate}>
        <Text style={isStoryPrivate ? styles.buttonHeaderActive : styles.buttonHeader }>Private</Text>
        <Text style={isStoryPrivate ? styles.buttonSubTextActive : styles.buttonSubText}>By making your story private only those you share it with can listen.</Text>
      </TouchableOpacity>
    </View>
  ); 
};

export default CreateStoryComponent;