import React from 'react';
import {View, Text, Keyboard} from 'react-native';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import CreateStoryComponent from './../components/CreateStoryComponent';
import ButtonComponent from './../components/ButtonComponent';

// Styles
import styles from './../styles/screens/StoryCreationScreen';
import { ICON_SIZE, COLOR } from './../styles/styleHelpers';

const StoryCreationScreen = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
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
      <View style={styles.footer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <CreateStoryComponent />
          <View style={styles.buttonContainer}>
            <ButtonComponent
              title="Next"
              buttonSize="small"
              buttonType="solid"
              onButtonPress={() => console.log("HELLO")}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      
    </View>
  );
};

export default StoryCreationScreen;
