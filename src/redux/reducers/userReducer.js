import {
  USER_LOGIN_SUCCESSFUL,
  SET_USER_TOKEN,
  REMOVE_USER_TOKEN,
  REMOVE_LIKED_STORY,
  REMOVE_BOOKMARKED_STORY,
  ADD_LIKED_STORY,
  ADD_BOOKMARKED_STORY,
  RETURN_USER_REDUCER_TO_DEFAULT_STATE,
  SET_USER_STORIES
} from './../actions/allActions';

const userDefaultState = {
  id: null,
  loggedIn: false,
  emailAddress: "",
  isAdmin: false,
  firstName: "",
  lastName: "",
  username: "",
  avatarURL: "",
  bookMarks: [],
  likedStories: [],
  userStories: []
};

const userReducer = (state = userDefaultState, action) => {
  
  switch (action.type) {
    case USER_LOGIN_SUCCESSFUL:
      const userData = action.payload.userData;
      const emailAddress = userData.emailAddress;
      const firstName = userData.firstName;
      const lastName = userData.lastName;
      const avatarURL = userData.avatarURL ? userData.avatarURL : "";
      const bookMarks = userData.bookmarks;
      const likedStories = userData.likedStories;
      const username = userData.username;

      return {
        ...state,
        loggedIn: true,
        emailAddress: emailAddress,
        isAdmin: false,
        firstName: firstName,
        lastName: lastName,
        username: username,
        avatarURL: avatarURL,
        bookMarks: bookMarks ? bookMarks.map(bookMark => bookMark.id) : [],
        likedStories: likedStories ? likedStories.map(likedStory => likedStory.id) : []
      };

    case SET_USER_TOKEN:  
      return {
        ...state,
        id: action.payload.encryptedToken
      };

    case REMOVE_USER_TOKEN: 
      return {
        id: null
      };

    case REMOVE_LIKED_STORY: 
      const updatedLikedList = state.likedStories.filter(story => story != action.payload);
      return {
        ...state,
        likedStories: updatedLikedList
      };

    case ADD_LIKED_STORY: 
      return {
        ...state,
        likedStories: state.likedStories.concat(action.payload)
      };

    case ADD_BOOKMARKED_STORY:
      return {
        ...state,
        bookMarks: state.bookMarks.concat(action.payload)
      };

    case REMOVE_BOOKMARKED_STORY:
      const updatedBookmarkList = state.bookMarks.filter(story => story != action.payload);
      return {
        ...state,
        bookMarks: updatedBookmarkList
      };
    
    case SET_USER_STORIES: 
      const userStories = action.payload;
      return {
        ...state,
        userStories: userStories
      };

    case RETURN_USER_REDUCER_TO_DEFAULT_STATE:
      return userDefaultState;
    default:
      return state;
  }
};

export default userReducer;