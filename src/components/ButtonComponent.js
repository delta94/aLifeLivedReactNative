import React from 'react';
import {Button} from 'react-native-elements';

import styles from '../styles/components/ButtonComponent';

const ButtonComponent = ({buttonType, title, isLoading, onButtonPress, disabled}) => {

  const handleOnPress = () => {
    return onButtonPress();
  };

  return (
    <Button 
      title={title}
      type={buttonType ? buttonType : null}
      loading={isLoading ? true : false}
      buttonStyle={styles.button}
      titleStyle={styles.title}
      disabled={disabled}
      containerStyle={styles.container}
      onPress={handleOnPress}
    />
  )
};

export default ButtonComponent;