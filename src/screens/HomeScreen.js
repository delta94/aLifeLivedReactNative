import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, FlatList} from 'react-native';

// API
import {getAllPublicStories} from './../api/getRequests/getStory';

// Components
import StoryCardComponent from './../components/StoryCardComponent';

const HomeScreen = (props) => {

  const [stories, setStories] = useState([]);

  console.log(stories);
  const onLoad = async () => {
    const allStories = await getAllPublicStories();
    return setStories(allStories.data)
  };

  const renderStories = ({item}) => (
    <StoryCardComponent 
      title={item.title}
      description={item.description}
      tags={item.tags}
    />
  );

  useEffect(() => {
    onLoad();
  }, []);


  return (
    <View>
      <Text> {props.userReducer.firstName ? props.userReducer.firstName : "YO"} </Text>
      <FlatList 
        data={stories}
        renderItem={renderStories}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer
  };
};

export default connect(mapStateToProps)(HomeScreen);
