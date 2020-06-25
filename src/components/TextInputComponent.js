import React from 'react';
import {Text, TextInput, View, Platform} from 'react-native';

// Styles
import styles from './../styles/components/TextInputComponent';

const TextInputComponent = ({
  onChange,
  placeholder,
  label,
  keyboardType,
  isMultiline,
  numberOfLines,
  inputSize,
  value,
  name,
  required,
  defaultValue,
  secureTextEntry
}) => {
  // NOTE: number of lines needs to be null or you can't see text on android  
  const handleChange = (event) => {
    return onChange(event.nativeEvent);
  };

  return (
    <View>
      <Text> {label} </Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={styles.placeHolder.color}
        value={value ? value : null}
        defaultValue={defaultValue ? defaultValue : null}
        onChange={handleChange}
        secureTextEntry={
          placeholder === 'Password' || secureTextEntry === true ? true : false
        }
        keyboardType={keyboardType ? keyboardType : 'default'}
        multiline={isMultiline ? isMultiline : false}
        numberOfLines={numberOfLines ? numberOfLines : null}
      />
    </View>
  );
};

export default TextInputComponent;