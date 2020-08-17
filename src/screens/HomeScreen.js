import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, FlatList} from 'react-native';

// API
import {getAllPublicStories} from './../api/getRequests/getStory';

// Components
import StoryCardComponent from './../components/StoryCardComponent';

// Styles
import styles from './../styles/screens/HomeScreen';

const HomeScreen = (props) => {

  const [stories, setStories] = useState([]);

  const onLoad = async () => {
    const allStories = await getAllPublicStories();
    return setStories(allStories.data)
  };

  const renderStories = ({item}) => (
    <StoryCardComponent 
      title={item.title}
      description={item.description}
      tags={item.tags}
      avatarURL={item.interviewer.avatarURL}
      likes={item.likes}
    />
  );

  useEffect(() => {
    onLoad();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Popular</Text>
        <FlatList
          data={stories}
          renderItem={renderStories}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer
  };
};

export default connect(mapStateToProps)(HomeScreen);
