import React from 'react';
import {Button} from 'react-native-elements';

// Styles
import styles from '../styles/components/ButtonClearComponent';

const ButtonClearComponent = ({
  title,
  isLoading,
  onButtonPress,
  disabled,
}) => {
  const handleOnPress = () => {
    return onButtonPress();
  };

  return (
    <Button
      title={title}
      type={"clear"}
      loading={isLoading ? true : false}
      disabled={disabled}
      onPress={handleOnPress}
    />
  );
};

export default ButtonClearComponent;
