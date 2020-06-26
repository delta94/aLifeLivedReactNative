import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';

import styles from '../styles/components/ButtonComponent';



const ButtonComponent = ({buttonType, title, isLoading}) => {

  return (
    <View>
      <Button 
        title={title}
        type={buttonType ? buttonType : null}
        loading={isLoading ? true : false}
        buttonStyle={styles.button}
        titleStyle={styles.title}
        containerStyle={styles.container}
      />
    </View>
  )
};

export default ButtonComponent;