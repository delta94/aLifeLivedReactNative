import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Components
import AvatarComponent from './AvatarComponent';

// Styles
import { ICON_SIZE, COLOR } from './../styles/styleHelpers';
import styles from '../styles/components/StoryCardComponent';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

const StoryCardComponent = ({title, description, tags, avatarURL, likes}) => {
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
          <Text style={styles.header}>{title}</Text>
          <View style={styles.likesContainer}>
            <IonIcons
              name="ios-heart-empty"
              size={ICON_SIZE.iconSizeMedium}
              color={COLOR.grey}
            />
            <Text style={styles.likes}>{likes}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bookMarkContainer}>
        <MaterialCommunityIcons
          name="bookmark-outline"
          size={ICON_SIZE.iconSizeMedium}
          color={COLOR.grey}
        />
      </View>

    </View>
  )
};

export default StoryCardComponent;