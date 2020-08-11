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

const StoryViewScreen = ({route, navigation}) => {

  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onLoad = async () => {
    setIsLoading(true);
    const storyData = await getStoryByID(route.params.storyID)
    setStory(storyData);
    return setIsLoading(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View>
          <AntDesign
            name="close"
            size={ICON_SIZE.iconSizeMedium}
            color={COLOR.grey}
            style={styles.icon}
            onPress={() => handleOnClose()}
          />
          <View style={styles.headerContainer}>
            <AvatarComponent
              isRounded={true}
              size="large"
              iconName="user"
              source={story === null ? "" : story.interviewer.avatar}
            />
          
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{story === null ? "" : story.title}</Text>
            <Text style={styles.headerText}>{story === null ? "" : story.description}</Text>
          </View>
          </View>
        </View>
      )}
    </View>
  )
};

export default StoryViewScreen;