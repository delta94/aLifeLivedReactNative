import React from 'react';
import {View, Text, Keyboard, KeyboardAvoidingView} from 'react-native';
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";

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
    <View style={styles.mainContainer} onPress={Keyboard.dismiss}>
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
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <View style={styles.footer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.contentContainer}>
              <CreateStoryComponent />
            </View>

            <View style={styles.buttonContainer}>
              <ButtonComponent
                title="Next"
                buttonSize="small"
                buttonType="solid"
                onButtonPress={() => console.log('HELLO')}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default StoryCreationScreen;
