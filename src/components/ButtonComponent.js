import React from 'react';
import {Button} from 'react-native-elements';

import styles from '../styles/components/ButtonComponent';

const ButtonComponent = ({buttonType, title, isLoading, onButtonPress, disabled, buttonSize, icon}) => {

  const handleOnPress = () => {
    return onButtonPress();
  };

  return (
    <Button
      title={title}
      icon={icon}
      type={buttonType ? buttonType : null}
      loading={isLoading ? true : false}
      buttonStyle={title === "Back" || title === "No" ? styles.backButton : styles.button}
      disabledStyle={styles.disabledButton}
      titleStyle={styles.title}
      disabled={disabled}
      containerStyle={buttonSize === "small" ? styles.buttonSmallContainer : styles.container}
      onPress={handleOnPress}
    />
  );
};

export default ButtonComponent;