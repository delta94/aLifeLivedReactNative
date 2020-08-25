import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Components
import AvatarComponent from './AvatarComponent';

// Icons
import IconComponent from './IconComponent';

// Styles
import { ICON_SIZE, COLOR } from './../styles/styleHelpers';
import styles from '../styles/components/UserCardComponent';

const UserCardComponent = ({firstName, lastName, avatarURL, username}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageAndTextContainer}>
        <AvatarComponent
          isRounded={false}
          isSquare
          showEditButton={false}
          size="medium"
          source={avatarURL}
        />

        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.header}>{username}</Text>
            <Text>{`${firstName} ${lastName}`}</Text>
          </View>
        </View>
      </View>

      <View style={styles.iconContainer}>
        <IconComponent
          name="chevron-right"
          type="font-awesome-5"
          style={{ alignSelf: "flex-start" }}
          size={ICON_SIZE.iconSizeSmall}
          color={COLOR.grey}
        />
      </View>
    </View>
  )
};

export default UserCardComponent;