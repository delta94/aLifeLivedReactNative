import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

// API
import {getStoryByID} from './../api/getRequests/getStory';

// Component
import AvatarComponent from './../components/AvatarComponent';

// Styles
import styles from './../styles/screens/StoryViewScreen';
import { ICON_SIZE, COLOR } from './../styles/styleHelpers';

// Icon
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

const StoryViewScreen = ({route, navigation}) => {

  const [story, setStory] = useState(null);
  const [responses, setResponses] = useState([]);

  const onLoad = async () => {
    const storyData = await getStoryByID(route.params.storyID)
    setResponses(storyData.responses);
    return setStory(storyData);
  };

  console.log("MAX", responses);

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <AntDesign
          name="close"
          size={ICON_SIZE.iconSizeMedium}
          color={COLOR.grey}
          style={styles.icon}
          onPress={() => handleOnClose()}
        />
        <View style={styles.header}>
          <AvatarComponent
            isRounded={true}
            size="large"
            iconName="user"
            source={story === null ? '' : story.interviewer.avatar}
          />

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitleText}>
              {story === null ? '' : story.title}
            </Text>
            <Text style={styles.headerDescriptionText}>
              {story === null ? '' : story.description}
            </Text>
          </View>
        </View>
      </View>

      {/* TO DO - ADD THE QUESTIONS HERE */}
      <View style={styles.middleContainer}>
        <Text style={styles.middleText}>Loading...</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.audioControllerContainer}>
          <IonIcons
            name="ios-skip-backward"
            size={ICON_SIZE.iconSizeXLarge}
            color={COLOR.grey}
          />

          <MaterialCommunityIcons
            name="play-circle"
            size={ICON_SIZE.iconSizeXLarge}
            color={COLOR.grey}
          />

          <IonIcons
            name="ios-skip-forward"
            size={ICON_SIZE.iconSizeXLarge}
            color={COLOR.grey}
          />
        </View>

        <View style={styles.bookMarkContainer}>
          <IonIcons
            name="ios-heart-empty"
            size={ICON_SIZE.iconSizeLarge}
            color={COLOR.grey}
          />

          <MaterialCommunityIcons
            name="bookmark-outline"
            size={ICON_SIZE.iconSizeLarge}
            color={COLOR.grey}
          />
        </View>
      </View>
    </View>
  );
};

export default StoryViewScreen;