import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Components
import AvatarComponent from './AvatarComponent';

// Styles
import { ICON_SIZE, COLOR } from './../styles/styleHelpers';
import styles from '../styles/components/StoryCardComponent';

// Icons
import { Icon } from 'react-native-elements'

const StoryCardComponent = ({title, description, tags, avatarURL, likes, hasUserLikedStory, hasUserBookMarkedStory}) => {
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
            <Icon
              name="heart"
              disabled={hasUserLikedStory}
              solid={hasUserLikedStory}
              type='font-awesome-5'
              size={ICON_SIZE.iconSizeSmall}
              disabledStyle={{ backgroundColor: null }}
              color={COLOR.red}
            />
            <Text style={styles.likes}>{likes}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bookMarkContainer}>
        <Icon
          name="bookmark"
          type='font-awesome-5'
          solid={hasUserBookMarkedStory}
          size={ICON_SIZE.iconSizeSmall}
          color={COLOR.grey}
          disabledStyle={{ backgroundColor: null }}
        />
      </View>

    </View>
  )
};

export default StoryCardComponent;