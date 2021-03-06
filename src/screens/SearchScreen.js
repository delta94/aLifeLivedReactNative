import React, {useState} from 'react';
import { connect } from 'react-redux';
import {View, Text, TouchableOpacity, SectionList} from 'react-native';
import {SearchBar} from 'react-native-elements';

// Actions
import { addBookMarkedStory, removeBookMarkedStory } from './../redux/actions/userActions';

// API
import { getSearchResults } from './../api/getRequests/getSearch';
import { bookMarkStory, unBookMarkStory } from './../api/putRequests/user';

// Components
import StoryCardComponent from './../components/StoryCardComponent';
import UserCardComponent from './../components/UserCardComponent';

// Styles
import styles from './../styles/screens/SearchScreen';

const SearchScreen = ({ navigation, userReducer, addBookMarkedStory, removeBookMarkedStory}) => {

  const [search, setSearch] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [storyResults, setStoryResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateSearch = async (search) => {
    setIsLoading(true);
    
    // Sets the search to update
    setSearch(search);

    // Calls API
    const response = await getSearchResults(search);

    if (response.status === 200) {
      // If no data returned still ensure that the states are empty arrays
      setUserResults(!response.data ? [] : response.data.users);
      setStoryResults(!response.data ? [] : response.data.stories);
      return setIsLoading(false);
    } else {
      console.log('error');
      return setIsLoading(false);
    }
  };

  // When the user clicks on user card
  const onUserPress = (userID) => {
    return navigation.navigate("Profile", {userID});
  };

  // When the user clicks on story card
  const onStoryPress = (storyID) => {
    const userID = userReducer.id

    // Navigates to the Screens navigator then storyStack then to view Story
    return navigation.navigate('screensNavigator', {
      screen: 'storyStack',
      params: {
        screen: 'View Story',
        params: { storyID, userID }
      },
    });
  };

  // Handle when user clicks on bookmark button
  const onBookmarkPress = async (hasUserBookMarkedStory, storyID) => {

    // If user is not logged in
    if (!userReducer.id) {
      return navigation.navigate('authNavigator', {
        screen: 'authStack',
        params: {
          screen: 'Login'
        }
      });
    };

    // If already bookmarked 
    if (hasUserBookMarkedStory) {
      const response = await unBookMarkStory(storyID, userReducer.id);
      response.status === 200 ? removeBookMarkedStory(storyID) : console.log("ERROR");
    } else {
      const response = await bookMarkStory(storyID, userReducer.id);
      response.status === 200 ? addBookMarkedStory(storyID) : console.log("ERROR");
    };
  };

  // Renders user and story cards
  const renderResults = ({item, section}) => {
    const hasUserLikedStory = userReducer.likedStories ? userReducer.likedStories.includes(item.id) : false;
    const hasUserBookMarkedStory = userReducer.bookMarks ? userReducer.bookMarks.includes(item.id) : false;

    switch (section.title) {
      case "Users":
        return (
          <>
            <TouchableOpacity onPress={() => onUserPress(item.id)} style={styles.card}>
              <UserCardComponent
                firstName={item.firstName}
                lastName={item.lastName}
                avatarURL={item.avatarURL}
                username={item.username}
              />
            </TouchableOpacity>
          </>
        );
      case "Stories": 
        return (
          <>
            <TouchableOpacity onPress={() => onStoryPress(item.id)} style={styles.card}>
              <StoryCardComponent
                title={item.title}
                description={item.description}
                tags={item.tags}
                avatarURL={item.interviewer.avatarURL}
                likes={item.likes}
                hasUserLikedStory={hasUserLikedStory}
                hasUserBookMarkedStory={hasUserBookMarkedStory}
                onBookMarkPress={() => onBookmarkPress(hasUserBookMarkedStory, item.id)}
              />
            </TouchableOpacity>
          </>
        );
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.resultsContainer}>
          <SearchBar
            placeholder="Search for users or stories"
            onChangeText={(search) => updateSearch(search)}
            containerStyle={{ backgroundColor: 'none', borderBottomWidth: 0, borderTopWidth: 0 }}
            value={search}
            showLoading={isLoading}
            showCancel
            round
          />
          <SectionList 
            sections={[
              {title: 'Users', data: userResults},
              {title: 'Stories', data: storyResults}
            ]}
            renderItem={renderResults}
            renderSectionHeader={({ section }) => (
              !section.data.length ? (
                null
              ) : (
                <View>
                  <Text style = {styles.headerText}>{section.title}</Text>
                </View>
              )
          
            )}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps='always'
            stickySectionHeadersEnabled={false}
          />
        </View>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
    allCollectionsReducer: state.allCollectionsReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBookMarkedStory: (storyID) => dispatch(addBookMarkedStory(storyID)),
    removeBookMarkedStory: (storyID) => dispatch(removeBookMarkedStory(storyID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
