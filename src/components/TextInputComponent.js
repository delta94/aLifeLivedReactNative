import React from 'react';
import {View} from 'react-native';
import {Input} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Styles
import styles from './../styles/components/TextInputComponent';
import {COLOR} from './../styles/styleHelpers';
MaterialIcons.loadFont();

const TextInputComponent = ({
  onChange,
  placeholder,
  label,
  iconType,
  iconName,
  disable,
  errorMessage,
  keyboardType,
}) => {
  // NOTE: number of lines needs to be null or you can't see text on android  
  const handleChange = (event) => {
    return onChange(event);
  };
 
  return (
    <View>
        <Input 
          placeholder={placeholder}
          leftIcon={{type: iconType, name: iconName}}
          onChangeText={handleChange}
          disabled={disable}
          errorMessage={errorMessage}
          label={label}
          inputContainerStyle={styles.textInput}
          inputStyle={styles.textStyle}
          placeholderTextColor={COLOR.grey}
          keyboardType={keyboardType ? keyboardType : "default"}
        />
    </View>
  );
};

export default TextInputComponent;