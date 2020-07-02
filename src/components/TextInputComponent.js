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
  secureTextEntry,
  isFocused,
  inputValidation,
  autoCapitalize
}) => {
  // NOTE: number of lines needs to be null or you can't see text on android
  const handleChange = (event) => {
    return onChange(event);
  };

  const handleValidation = (event) => {
    return inputValidation(event);
  }

  return (
    <View>
      <Input
        onEndEditing={inputValidation ? (event) => handleValidation(event.nativeEvent.text) : null}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        leftIcon={{type: iconType, name: iconName}}
        onChangeText={handleChange}
        disabled={disable}
        errorMessage={errorMessage}
        label={label}
        isFocused={isFocused}
        inputContainerStyle={styles.textInput}
        inputStyle={styles.textStyle}
        placeholderTextColor={COLOR.grey}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ? keyboardType : 'default'}
      />
    </View>
  );
};

export default TextInputComponent;