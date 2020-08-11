import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

// API
import {getStoryByID} from './../api/getRequests/getStory';

// Component
import AvatarComponent from './../components/AvatarComponent';

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
    <View>
      {isLoading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View>
          <View>
            <AvatarComponent
              isRounded={true}
              size="large"
              iconName="user"
              source={story === null ? "" : story.interviewer.avatar}
            />
            <Text>{story === null ? "" : story.title}</Text>
            <Text>{story === null ? "" : story.description}</Text>
          </View>
        </View>
      )}
    </View>
  )
};

export default StoryViewScreen;