import React from 'react';
import { Input } from 'react-native-elements';

// Styles
import styles from './../styles/components/LargeTextInputComponent';
import { COLOR } from './../styles/styleHelpers';

const LargeTextInputComponent = ({
  onChange,
  placeholder,
  label,
  disable,
  errorMessage,
  keyboardType,
  secureTextEntry,
  isFocused,
  inputValidation,
  autoCapitalize,
  multiline,
  maxLength,
  value
}) => {
  // NOTE: number of lines needs to be null or you can't see text on android
  const handleChange = (event) => {
    return onChange(event);
  };

  const handleValidation = (event) => {
    return inputValidation(event);
  };

  return (
    <Input
      onEndEditing={inputValidation ? (event) => handleValidation(event.nativeEvent.text) : null}
      multiline={multiline}
      blurOnSubmit={true}
      maxLength={maxLength}
      autoCapitalize={autoCapitalize}
      placeholder={placeholder}
      onChangeText={handleChange}
      disabled={disable}
      errorMessage={errorMessage}
      label={label}
      value={value ? value : null}
      isFocused={isFocused}
      inputContainerStyle={styles.container}
      labelStyle={styles.labelStyles}
      inputStyle={styles.inputStyles}
      placeholderTextColor={COLOR.lightGrey}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType ? keyboardType : 'default'}
    />
  );
};

export default LargeTextInputComponent;