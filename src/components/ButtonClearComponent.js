import React from 'react';
import {Button} from 'react-native-elements';

// Styles
import styles from '../styles/components/ButtonClearComponent';

const ButtonClearComponent = ({
  title,
  isLoading,
  onButtonPress,
  disabled,
  titleStyle,
  buttonType
}) => {
  const handleOnPress = () => {
    return onButtonPress();
  };

  return (
    <Button
      title={title}
      type={buttonType}
      loading={isLoading ? true : false}
      disabled={disabled}
      raised={true}
      onPress={handleOnPress}
      titleStyle={titleStyle}
    />
  );
};

export default ButtonClearComponent;
