import React from 'react';
import {View} from 'react-native';
import {Avatar} from 'react-native-elements';

// Styles
import styles from '../styles/components/AvatarComponent';
import {COLOR} from './../styles/styleHelpers';

const AvatarComponent = ({isRounded, size, iconName, source, showEditButton, onPress }) => {

  const handleOnPress = () => {
    return onPress();
  }

  return (
    <View>
      <Avatar
        rounded={isRounded ? true : false}
        size={size}
        icon={{name: iconName, type: 'font-awesome', color: COLOR.grey}}
        showEditButton={showEditButton}
        source={ source ? {uri: source} : null}
        containerStyle={styles.container}
        onPress={handleOnPress}
      />
    </View>
  );
};

export default AvatarComponent;